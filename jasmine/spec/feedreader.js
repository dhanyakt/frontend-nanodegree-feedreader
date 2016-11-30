/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */
/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function () {
    /* This is our first test suite - a test suite just contains
     * a related set of tests. This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     */
    describe('RSS Feeds', function () {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty.
         */
        it('are defined', function () {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('loops through allFeeds and url defined', function () {
            for (var i = 0; i < allFeeds.length; i++) {
                var elem = allFeeds[i];
                var url = allFeeds[i].url;
                expect(elem).toBeDefined();
                expect(url.length).not.toBe(0);
            }
        });


        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('name property defined', function () {
            for (var i = 0; i < allFeeds.length; i++) {
                var name = allFeeds[i].name;
                expect(name).toBeDefined();
                expect(name.length).not.toBe(0);
            }
        });
    });


    /* test suite named "The menu" */
    describe('The Menu', function () {

        /* test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('should be hidden by default', function () {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

        /* test that ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * should have two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */
        it('hide onClick', function () {
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(false);
        });

        it('show onClick', function () {
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });

    /* Test suite named "Initial Entries" */
    describe('Initial Entries', function () {
        beforeEach(function (done) {
            loadFeed(0, done);
        });

        /* test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        it('contains at least a single entry element in feed container', function () {
            var entry_items = $('.feed .entry').length;
            expect(entry_items).toBeGreaterThan(0);
        });
    });

    /* Test suite named "New Feed Selection" */
    describe('News Feed Selection', function () {
        var first_content;
        beforeEach(function (done) {
            loadFeed(1, function () {
                first_content = $('.feed').html();
                console.log("First content:" + first_content);
                done();
            });
        });

        /* test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        it('content changes', function (done) {
            loadFeed(2, function () {
                console.log($('.feed').html());
                expect($('.feed').html()).not.toEqual(first_content);
                done();
            });
        });
    });
}());