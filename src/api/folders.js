import http from './http';
import Exception from '../util/Exception';

class FoldersApiException extends Exception {}

export default {

    /**
     * Get list of folders for a module
     */
    getFolders: function(session, module, parentId) {
        
        // require passed values
        if (!session) throw new FoldersApiException('A valid session is required to make a server call.');
        if (!module) throw new FoldersApiException('Unknown module provided.');

        // list of columns to return (defined at http://oxpedia.org/wiki/index.php?title=HTTP_API#CommonFolderData)
        const columns = '1,2,3,4,5,6,20,300,301,302,304,305,306,307,308,309,310,311,312,313,314,315,316,317,318';

        // if no action, assume root folder
        let action = parentId ? 'list' : 'root';

        // peform fetch
        return http.get('folders', {action: action, session: session, allowed_modules: module, columns: columns, parent: parentId})
        .then(json => {
            if (json.error) {
                throw new FoldersApiException('Folder Error: There was an error fetching the folders.', json.error);
            }
            return json;
        })

    }

}