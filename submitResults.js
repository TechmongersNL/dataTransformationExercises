const request = require('axios')
const gitconfig = require('gitconfig')

module.exports = (output) => {
    gitconfig.get({
        location: 'global'
      }).then((config) => {
        if(!config || !config.user || !config.user.name || !config.user.email){
            config = { user: { name: 'anonymous', email: 'anonymous@anon.com' }}
        }

        request.post(
            'https://dry-sands-42052.herokuapp.com/results', 
            { 
                output, 
                ...config
            }, 
            { headers: {
                "Content-type": "application/json",
            }}
        ).catch(err => {
            console.log(err)
        })        
      })


    return output
}