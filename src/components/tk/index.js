import Avatar from './Avatar';
import InlineAlert from './InlineAlert';
import FolderIcon from './FolderIcon';

const components = {
    Avatar,
    InlineAlert,
    FolderIcon
};

components.install = (Vue) => {
    for (let component in components) {
        const componentInstaller = components[component];

        if (componentInstaller && component !== 'install') {
           Vue.use(componentInstaller);
        }
    }
};

export default components;