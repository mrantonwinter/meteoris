Frontend.PostsController = MeteorisController.extend({
    /* get subscribtion from server with parameter criteria, and sort/limit */
    waitOn: function() {
        var sort = MeteorisGridView.getSorting();
        sort.limit = this.limit();

        return [
            this.subs.subscribe('posts', this.getCriteria(), sort),
        ];
    },
    /* passing data from controllers to view */
    data: function() {
        var sort = MeteorisGridView.getSorting();
        sort.limit = this.limit();
        var models = Posts.find(this.getCriteria(), sort);

        return {
            isEmpty: models.count() === 0 ? true : false,
            models: models,
            images: Images.find(),
            model: this.getId() ? Posts.findOne(this.getId()) : null,
            hasMore: this.limit() == models.fetch().length ? this.route.path({limit: this.limit() + this.increment}) : null,
        };
    },
    /* event searching data by user input with parameter */
    search: function(t) {
        Router.go('frontend_postsIndex', {limit: this.limit(), search: t.find('#search').value});
    },
    /* @override getCriteria */
    getCriteria: function() {
        var search = this.params.search ? this.params.search : "";
        return {
            $or: [
                {title: {$regex: search, $options: 'i'}},
                {content: {$regex: search, $options: 'i'}},
            ]
        };
    },
});