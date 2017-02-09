import ListItem from './ListItem';

export default function install(Vue) {
    
    Vue.component('ox-list-item', Vue.extend(ListItem));

}
