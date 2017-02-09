import InlineAlert from './InlineAlert';

export default function install(Vue) {
    
    Vue.component('ox-inline-alert', Vue.extend(InlineAlert));

}
