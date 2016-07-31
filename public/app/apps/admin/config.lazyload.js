// lazyload config

angular.module('app')
  .constant('MODULE_CONFIG', [
      {
          name: 'ui.select',
          module: true,
          files: [
              'vendor/angular-ui-select/dist/select.min.js',
              'vendor/angular-ui-select/dist/select.min.css'
          ]
      },
      {
          name: 'textAngular',
          module: true,
          files: [
              'vendor/textAngular/dist/textAngular-sanitize.min.js',
              'vendor/textAngular/dist/textAngular.min.js'
          ]
      },
      {
          name: 'vr.directives.slider',
          module: true,
          files: [
              'vendor/venturocket-angular-slider/build/angular-slider.min.js',
              'vendor/venturocket-angular-slider/angular-slider.css'
          ]
      },
      {
          name: 'angularBootstrapNavTree',
          module: true,
          files: [
              'vendor/angular-bootstrap-nav-tree/dist/abn_tree_directive.js',
              'vendor/angular-bootstrap-nav-tree/dist/abn_tree.css'
          ]
      },
      {
          name: 'angularFileUpload',
          module: true,
          files: [
              'vendor/angular-file-upload/angular-file-upload.js'
          ]
      },
      {
          name: 'ngImgCrop',
          module: true,
          files: [
              'vendor/ngImgCrop/compile/minified/ng-img-crop.js',
              'vendor/ngImgCrop/compile/minified/ng-img-crop.css'
          ]
      },
      {
          name: 'smart-table',
          module: true,
          files: [
              'vendor/angular-smart-table/dist/smart-table.min.js'
          ]
      },
      {
          name: 'ui.map',
          module: true,
          files: [
              'vendor/angular-ui-map/ui-map.js'
          ]
      },
      {
          name: 'ngGrid',
          module: true,
          files: [
              'vendor/ng-grid/build/ng-grid.min.js',
              'vendor/ng-grid/ng-grid.min.css',
              'vendor/ng-grid/ng-grid.bootstrap.css'
          ]
      },
      {
          name: 'ui.grid',
          module: true,
          files: [
              'vendor/angular-ui-grid/ui-grid.min.js',
              'vendor/angular-ui-grid/ui-grid.min.css',
              'vendor/angular-ui-grid/ui-grid.bootstrap.css'
          ]
      },
      {
          name: 'xeditable',
          module: true,
          files: [
              'vendor/angular-xeditable/dist/js/xeditable.min.js',
              'vendor/angular-xeditable/dist/css/xeditable.css'
          ]
      },
      {
          name: 'smart-table',
          module: true,
          files: [
              'vendor/angular-smart-table/dist/smart-table.min.js'
          ]
      },
      {
          name: 'dataTable',
          module: false,
          files: [
              'js/libs/jquery/datatables/media/js/jquery.dataTables.min.js',
              'js/libs/jquery/plugins/integration/bootstrap/3/dataTables.bootstrap.js',
              'js/libs/jquery/plugins/integration/bootstrap/3/dataTables.bootstrap.css'
          ]
      },
      {
          name: 'footable',
          module: false,
          files: [
              'js/libs/jquery/footable/dist/footable.all.min.js',
              'js/libs/jquery/footable/css/footable.core.css'
          ]
      },
      {
          name: 'easyPieChart',
          module: false,
          files: [
              'js/libs/jquery/jquery.easy-pie-chart/dist/jquery.easypiechart.fill.js'
          ]
      },
      {
          name: 'sparkline',
          module: false,
          files: [
              'js/libs/jquery/jquery.sparkline/dist/jquery.sparkline.retina.js'
          ]
      },
      {
          name: 'plot',
          module: false,
          files: [
              'js/libs/jquery/flot/jquery.flot.js',
              'js/libs/jquery/flot/jquery.flot.resize.js',
              'js/libs/jquery/flot/jquery.flot.pie.js',
              'js/libs/jquery/flot.tooltip/js/jquery.flot.tooltip.min.js',
              'js/libs/jquery/flot-spline/js/jquery.flot.spline.min.js',
              'js/libs/jquery/flot.orderbars/js/jquery.flot.orderBars.js'
          ]
      },
      {
          name: 'vectorMap',
          module: false,
          files: [
              'js/libs/jquery/bower-jvectormap/jquery-jvectormap-1.2.2.min.js',
              'js/libs/jquery/bower-jvectormap/jquery-jvectormap.css', 
              'js/libs/jquery/bower-jvectormap/jquery-jvectormap-world-mill-en.js',
              'js/libs/jquery/bower-jvectormap/jquery-jvectormap-us-aea-en.js'
          ]
      },
      {
          name: 'moment',
          module: false,
          files: [
              'js/libs/jquery/moment/moment.js'
          ]
      }
    ]
  )
  .config(['$ocLazyLoadProvider', 'MODULE_CONFIG', function($ocLazyLoadProvider, MODULE_CONFIG) {
      $ocLazyLoadProvider.config({
          debug: false,
          events: false,
          modules: MODULE_CONFIG
      });
  }]);
