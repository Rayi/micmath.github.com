// see: http://howtonode.org/intro-to-jake

desc('Building the site.');
task('default', [], function (params) {
    var fs = require('fs');
    
    // import the Mustache template tool
    eval(fs.readFileSync('Jake/lib/mustache.js', 'utf8'));
    
    var templates = {
        head: fs.readFileSync('Jake/templates/head.mustache', 'utf8'),
        foot: fs.readFileSync('Jake/templates/foot.mustache', 'utf8'),
        article: fs.readFileSync('Jake/templates/article.mustache', 'utf8'),
        example: fs.readFileSync('Jake/templates/example.mustache', 'utf8')
    };
    
    var outdir = 'howto/';
    
    var articles = [
        {
            title: 'Index',
            body: fs.readFileSync('Jake/articles/index', 'utf8'),
            out: 'index.html'
        },
        {
            title: 'Document CommonJS Modules',
            body: fs.readFileSync('Jake/articles/commonjs-modules', 'utf8'),
            out: 'commonjs-modules.html',
            description: 'Documenting code that conforms to the CommonJS server-side modules standard.'
        },
        {
            title: 'Project Roadmap',
            body: fs.readFileSync('Jake/articles/project-roadmap', 'utf8'),
            out: 'project-roadmap.html',
            description: 'A high-level overview of the plans for future work on the JSDoc 3 application.'
        }
    ];
    
    console.log('Cleaning gh-pages...');
    fs.readdirSync(outdir).forEach(function(file) {
        fs.unlinkSync(outdir+file);
        console.log('> removed '+outdir+file);
    });
    
    console.log('Building new gh-pages...');
    
    articles.forEach(function(article) {
        var html = Mustache.to_html(
            templates.article,
            {
                title: article.title,
                description: article.description,
                keywords: article.keywords,
                example: function() {
                    return function(text, render) {
                        return formatExample(text);
                    }
                }
            },
            {
                head: templates.head,
                foot: templates.foot,
                article: article.body
            }
        );
        
        fs.writeFileSync(outdir+article.out, html, 'utf8');
        console.log('> created '+outdir+article.out);
    });
    
    
    function formatExample(text) {
        // the first line of the text is the title of the example code
        var parts = text.split('\n'),
            title = parts.shift().trim(),
            code = parts.join('\n').trim();
            
        return Mustache.to_html(
            templates.example,
            {
                codeTitle: title,
                codeBody: code
            }
        );
    }
    
    //console.log(sys.inspect(arguments));
});