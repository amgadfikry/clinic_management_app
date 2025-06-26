//general components
import InputDiv from './components/inputDiv'
import SelectDiv from './components/selectDiv'
import Stars from './components/stars'
import AuthChecker from './components/authChecker'
import LoadingComponent from './components/loading'
import SearchBar from './components/searchBar'
import SearchResults from './components/searchResults'
import DoctorCard from './components/doctorCard'
import DoctorDateMonthly from './components/doctorDateMonthly'
import TextInput from './components/textInput'
import SubmitBtn from './components/submitBtn'
import ImageSelect from './components/imageSelect'
import Textarea from './components/textarea'
import InteractiveStars from './components/interactiveStars'
// landing page sections
import Head from './landing_sections/head'
import Insurance from './landing_sections/insurance'
import Offers from './landing_sections/offers'
import Search from './landing_sections/search'
import Services from './landing_sections/services'
import Testimonial from './landing_sections/testimonials'
import SectionHeader from './landing_sections/sectionHeader'
import Navbar from './landing_sections/navbar'
import About from './landing_sections/about'
import Footer from './landing_sections/footer'
// getstart (sign in & sign up)
import Signin from './getstart_sections/signin'
import Signup from './getstart_sections/signup'
// pages
import Dashboard from './pages/dashboard'
import LandingPage from './pages/landingPage'
import ComingSoon from './pages/comingSoon'
import NotFound from './pages/notFound'
import ServerError from './pages/serverError'
import GetStart from './pages/getstart';
// dashboard layout
import Sidebar from './dashboard_layout/sidebar'
import NavbarDashboard from './dashboard_layout/navbarDashboard'
import FooterDashboard from './dashboard_layout/footerDashboard'
import SidebarNavLink from './dashboard_layout/sidebarNavLink'
// dashnoard sections
import Home from './dashboard_sections/home/home'
import Profile from './dashboard_sections/profile/profile'
import ChangeInfo from './dashboard_sections/profile/changeInfo'
import ChangePassword from './dashboard_sections/profile/changePass'
import Appointments from './dashboard_sections/appointments/appointments'
import Feedback from './dashboard_sections/feedback/feedback'
import MakeAppointment from './dashboard_sections/makeappointment/makeAppointment'
import Review from './dashboard_sections/review/review'


// redux reducers and hooks
import { setUserData, userDataState } from './redux/profile';
import { useDispatch, useSelector } from 'react-redux';

// react-router-dom hooks
import { BrowserRouter as Router, Routes, Route, useNavigate, NavLink, Link, useLocation } from 'react-router-dom';

// constant through all app
import { baseUrl, checkDataError, samilarData, checkPassword } from '../constant'

// reacts hooks
import { useRef, useState, useEffect } from 'react'

// react-cookie hook
import { useCookies, CookiesProvider } from 'react-cookie';

// icons
import { FaUserNurse, FaHandHoldingHeart, FaRegCalendarCheck, FaShieldAlt, FaLock, FaCcVisa } from 'react-icons/fa';
import { PiStethoscopeBold, PiDotsThreeOutlineVerticalFill, PiIdentificationCard } from 'react-icons/pi';
import {
  BiLogoGithub, BiSolidQuoteLeft, BiSolidQuoteRight, BiLogoSlack, BiLogoReact, BiLogoMastodon, BiLogoMicrosoftTeams,
  BiLogoMagento, BiSolidCloudUpload
} from 'react-icons/bi'
import { MdNavigateNext, MdNavigateBefore, MdEmail, MdLightMode, MdDarkMode, MdOutlineSearch, MdSpaceDashboard } from 'react-icons/md'
import { TbCalendarPlus } from 'react-icons/tb'
import { BsArrowLeft, BsArrowRight, BsStarFill, BsStarHalf, BsStar, BsFillPersonFill, BsClipboardData, BsBriefcase } from 'react-icons/bs'
import { FaMoneyBill1Wave, FaLinkedinIn, FaGithub, FaXTwitter } from 'react-icons/fa6'
import { IoMdNotifications } from 'react-icons/io'
import { TbMenu2, TbMenuDeep } from "react-icons/tb";
import { AiOutlineSchedule, AiOutlineClose } from "react-icons/ai";
import { VscFeedback } from "react-icons/vsc";
import { CgProfile } from "react-icons/cg";
import { LiaSignOutAltSolid } from "react-icons/lia";
import { GrContactInfo } from "react-icons/gr";


export {
  //components
  InputDiv, SelectDiv, Head, Insurance, Offers, Search, SearchResults, Services, Testimonial, SectionHeader,
  Navbar, Dashboard, LandingPage, Stars, AuthChecker, LoadingComponent, ComingSoon, NotFound, ServerError, SearchBar,
  DoctorCard, DoctorDateMonthly, About, Footer, GetStart, Signin, Signup, TextInput, Sidebar, NavbarDashboard,
  FooterDashboard, SidebarNavLink, Home, Profile, Appointments, Feedback, ChangeInfo, ChangePassword, SubmitBtn, ImageSelect,
  Textarea, InteractiveStars, MakeAppointment, Review,

  //redux
  setUserData, userDataState, useDispatch, useSelector,
  //react-router-dom
  Router, Routes, Route, useNavigate, NavLink, Link, useLocation,
  //constant
  baseUrl, checkDataError, samilarData, checkPassword,
  //react-cookie
  useCookies, CookiesProvider,
  //react hooks
  useRef, useState, useEffect,
  //icons
  FaUserNurse, FaHandHoldingHeart, FaRegCalendarCheck, FaShieldAlt, PiStethoscopeBold, BiLogoGithub, BiSolidQuoteLeft, BiSolidQuoteRight,
  MdNavigateNext, MdNavigateBefore, TbCalendarPlus, BsArrowLeft, BsArrowRight, BsStarFill, BsStarHalf, BsStar, PiDotsThreeOutlineVerticalFill,
  BsFillPersonFill, FaMoneyBill1Wave, PiIdentificationCard, BiLogoSlack, BiLogoReact, BiLogoMastodon, BiLogoMicrosoftTeams, BiLogoMagento,
  FaLinkedinIn, FaGithub, FaXTwitter, FaLock, MdEmail, MdLightMode, IoMdNotifications, MdDarkMode, MdOutlineSearch, TbMenu2, TbMenuDeep,
  MdSpaceDashboard, AiOutlineSchedule, FaCcVisa, VscFeedback, CgProfile, LiaSignOutAltSolid, AiOutlineClose, BsClipboardData, BiSolidCloudUpload,
  GrContactInfo, BsBriefcase
}