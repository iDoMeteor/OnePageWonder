Simply, and in easy to understand syntax..

cp -r boostrap/js meteorpress/client/bootstrap-js
cp -r bootstrap/less meteorpress/packages/boostrap-less
cp -r bootstrap/fonts meteorpress/public 
      (not sure if it's finding these yet..looks like it)

Then in meteorpress/client/themes/bootstrap-text-only/vanilla.less

    @import "/packages/bootstrap-less/boostrap.less";
    @import "/packages/bootstrap-less/theme.less";
