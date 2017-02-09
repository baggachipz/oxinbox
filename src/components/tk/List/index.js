import List from './List';

export default function install(Vue) {
    
    Vue.component('ox-list', Vue.extend(List));

}
