import Sidenav from './Sidenav';

export default function install(Vue) {
    
    Vue.component('ox-sidenav', Vue.extend(Sidenav));

}
