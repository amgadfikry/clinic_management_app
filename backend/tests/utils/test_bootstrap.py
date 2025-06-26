# backend/tests/utils/test_bootstrap.py

import pytest
import os
from models import Admin
from utils import create_admin_if_not_exists
from app import app


@pytest.fixture(autouse=True)
def clean_admin_table():
    """Clean the admin table before and after each test"""
    from db import Session
    Session.query(Admin).delete()
    Session.commit()
    yield
    Session.rollback()
    Session.remove()


class TestCreateAdminWithAppContext:

    @pytest.fixture(autouse=True)
    def set_dev_env(self, monkeypatch):
        monkeypatch.setenv("ENV", "dev")

    def test_create_admin_if_not_exists(self):
        """Test that admin is created when missing"""
        from db import Session
        create_admin_if_not_exists(Session)
        admin = Session.query(Admin).filter_by(user_name="admin").first()
        assert admin is not None
        assert admin.email == "admin@example.com"

    def test_does_not_create_duplicate_admin(self):
        """Test no duplicate admin is created"""
        from db import Session
        create_admin_if_not_exists(Session)
        create_admin_if_not_exists(Session)
        admins = Session.query(Admin).filter_by(user_name="admin").all()
        assert len(admins) == 1

    def test_rollback_on_invalid_admin(self):
        """Test rollback behavior on bad admin"""
        from db import Session
        broken_admin = Admin(user_name="admin")  # Missing fields
        Session.add(broken_admin)
        with pytest.raises(Exception):
            Session.commit()
        Session.rollback()

        create_admin_if_not_exists(Session)
        admin = Session.query(Admin).filter_by(user_name="admin").first()
        assert admin is not None
        assert admin.email == "admin@example.com"

    def test_does_not_run_in_production(self, monkeypatch):
        """Should not create admin if ENV is not 'dev'"""
        monkeypatch.setenv("ENV", "test")
        from db import Session
        create_admin_if_not_exists(Session)
        admin = Session.query(Admin).filter_by(user_name="admin").first()
        assert admin is None
