Backend.UsersController = MeteorisController.extend({
    /* set layout template to backend */
    layoutTemplate: 'backend',
    /* get subscribtion from server with parameter criteria, and sort/limit */
    waitOn: function() {
    },
    /* passing data from controllers to view */
    data: function() {
        return {
        };
    },
    login: function(t) {
        var email = t.find('#email').value;
        var password = t.find('#password').value;

        Meteor.loginWithPassword(email, password, function(err) {
            if (err) {
                MeteorisFlash.set('danger', err.message);
            } else {
                MeteorisFlash.set('success', 'login success');
                Router.go('backend_sitesIndex');
            }
        });        
    },
    loginWithFacebook: function() {
        Meteor.loginWithFacebook({
            requestPermissions: ['publish_actions']
        }, function(err) {
            if (err) {
                MeteorisFlash.set('danger', err.message);
            } else {
                MeteorisFlash.set('success', 'login success');
                Router.go('backend_sitesIndex');
            }
        });
    },
    register: function(t) {
        var email = t.find('#email').value;
        var password = t.find('#password').value;
        var name = t.find('#name').value;
        var doc = {
            email: email,
            password: password,
            profile: {
                name: name,
                createdDate: new Date(TimeSync.serverTime()),
                updatedDate: new Date(TimeSync.serverTime()),
            }
        };

        Accounts.createUser(doc, function(err) {
            if (err) {
                MeteorisFlash.set('danger', err.message);
                throw new Meteor.Error(err);
            } else {
                MeteorisFlash.set('success', 'register success');
                Router.go('backend_sitesIndex');
            }
        });
    }
});