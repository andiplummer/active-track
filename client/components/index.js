/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as Navbar} from './navbar'
export {default as Footer} from './footer'
export {default as ActivityNavTabs} from './landing/interactive-tab-panel'
export {default as UserHome} from './user-home'
export {default as Leaderboard} from './landing/leaderboard'
export {default as Chart} from './landing/progress-chart'
export {default as RecordActivityForm} from './landing/add-activity-form'
export {default as ActivityHistoryTable} from './landing/activity-history'
export {default as FadeInAnimation} from './shared/fade-in-animation'
export {default as DropdownMenu} from './shared/dropdown-menu'
export {default as ArrowIcon} from './shared/dropdown-menu'
export {default as Profile} from './profile/profile'
export {default as ProfileImage} from './profile/avatar'
export {Login, Signup} from './auth-form'
export {default as HeroStats} from './hero-stats'