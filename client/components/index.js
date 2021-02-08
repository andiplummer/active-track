/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as Navbar} from './navbar'
export {default as UserHome} from './user-home'
export {default as Chart} from './perf-chart'
export {default as RecordActivityForm} from './record-activity-form'
export {default as ActivityHistoryTable} from './activity-history'
export {default as FadeInAnimation} from './shared/fade-in-animation'
export {default as DropdownMenu} from './shared/dropdown-menu'
export {default as ArrowIcon} from './shared/dropdown-menu'
export {Login, Signup} from './auth-form'
export {default as HeroStats} from './hero-stats'