// Copyright (c) 2013, Web Notes Technologies Pvt. Ltd. and Contributors
// MIT License. See license.txt


frappe.ui.toolbar.Toolbar = Class.extend({
    init: function() {
        this.make_admin_nav()
        //this.make();
        this.make_help();
        this.make_file();
        this.make_logout()
        this.make_home_icon()
        //this.make_history();
        //this.make_bookmarks();
        
        //this.make_user_menu();
        //this.make_notification();
        $('.dropdown-toggle').dropdown();
        //$(document).trigger('toolbar_setup');
        //$(document).on("page-change", function() {
        //    $("header .navbar .custom-menu").remove();
        //});
        //frappe.search.setup();
    },
    make_admin_menu_items: function(){
      modules_list = keys(frappe.modules).sort();
      module_li = ""
      $.each(modules_list.slice(0,5),function(i,module){
         module = frappe.get_module(module);
         if(module){
           $('<li class="dropdown dropdown-extended dropdown-inbox">\
           <a href="#" data-name="'+module.name+'" data-role="top_menu_item" data-link="'+module.link+'" class="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" data-close-others="true">\
             <i class="'+module.icon+'"></i>\
             <span class="title">'+module.label+'</span>\
          </a>\
          </li>').appendTo("#menu_bar_item")
         }
      })

      $('<li class="dropdown dropdown-user">\
        <a href="#" class="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" data-close-others="true">\
        <i class="fa fa-th"></i>\
        <span class="username username-hide-on-mobile">\
          Other </span>\
          <i class="fa fa-angle-down"></i>\
        </a>\
        <ul class="dropdown-menu dropdown-menu-default" id="other_menu_items">\
       </ul>\
       </li>').appendTo("#menu_bar_item")

      $.each(modules_list.slice(5,(modules_list.length-1)),function(i,module){
         module = frappe.get_module(module);
         if(module){
           $('<li>\
           <a data-name="'+module.name+'" data-role="top_menu_item" href="#" data-name="'+module.label+'" data-link="'+module.link+'" class="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" data-close-others="true">\
             <i class="'+module.icon+'"></i>\
             '+module.label+'\
          </a>\
          </li>').appendTo("#other_menu_items")
         }
      })

      $("[data-role='top_menu_item']").on("click",function(){
        document.cookie = "module=" + $(this).attr("data-name");
        frappe.ui.make_sidebar($(this).attr("data-name"))
      })
    },
    make_admin_nav: function(){
        $('#before_header').after('<div class="navbar navbar-inverse navbar-fixed-top" style="z-index: 99999;">\
            <ul class="nav navbar-nav pull-left" id="menu_bar_item">\
        </div>');
        this.make_admin_menu_items()
    },
    make: function() {
        $('header').append('<div class="navbar navbar-inverse navbar-fixed-top" role="navigation">\
   <div class="container">\
    <div class="navbar-header">\
     <button type="button" class="navbar-toggle" data-toggle="collapse" \
      data-target=".navbar-responsive-collapse">\
      <span class="icon-bar"></span>\
      <span class="icon-bar"></span>\
      <span class="icon-bar"></span>\
     </button>\
     <a class="navbar-brand" href="#"><i class="icon-home"></i></a>\
    </div>\
    <div class="collapse navbar-collapse navbar-responsive-collapse">\
     <ul class="nav navbar-nav navbar-left">\
     </ul>\
           <form class="navbar-form navbar-left" role="search" onsubmit="return false;">\
             <div class="form-group">\
               <input id="navbar-search" type="text" class="form-control small"\
       placeholder="' + __("Search or type a command") + '" \
       style="padding: 2px 6px; height: 24px; margin-top: 5px; \
        margin-left: 10px; background-color: #ddd; \
        min-width: 220px; font-size: 85%;\
        border-radius: 10px;">\
             </div>\
           </form>\
     <img src="assets/frappe/images/ui/spinner.gif" id="spinner"/>\
     <ul class="nav navbar-nav navbar-right">\
      <li class="dropdown">\
       <a class="dropdown-toggle" data-toggle="dropdown" href="#" \
        onclick="return false;">\
        <span id="toolbar-user-name"></span><b class="caret"></b></a>\
       <ul class="dropdown-menu" id="toolbar-user">\
       </ul>\
      </li>\
     </ul>\
    </div>\
   </div>\
   </div>');
    },
    make_home: function() {
        $('.navbar-brand').attr('href', "#");
    },
    make_notification: function() {
        $('.navbar .navbar-right').append('<li class="dropdown">\
   <a class="dropdown-toggl" href="#"  data-toggle="dropdown"\
    title="' + __("Unread Messages") + '"\
    onclick="return false;"><span class="navbar-new-comments">0</span></a>\
   <ul class="dropdown-menu" id="navbar-notification">\
   </ul>\
  </li>');
        $(document).on("notification-update", function() {
            frappe.ui.toolbar.update_notifications();
        })
    },
    make_file: function() {
        frappe.ui.toolbar.new_dialog = new frappe.ui.toolbar.NewDialog();
        frappe.ui.toolbar.search = new frappe.ui.toolbar.Search();
        frappe.ui.toolbar.report = new frappe.ui.toolbar.Report();
        $('.navbar .nav:first').prepend('<li class="dropdown">\
   <a class="dropdown-toggle" href="#"  data-toggle="dropdown"\
    title="' + __("File") + '"\
    onclick="return false;">' + __("File") + '</a>\
   <ul class="dropdown-menu" id="navbar-file">\
    <li><a href="#" onclick="return frappe.ui.toolbar.new_dialog.show();">\
     <i class="icon-fixed-width icon-plus"></i> ' + __('New') + '...</a></li>\
    <li><a href="#" onclick="return frappe.ui.toolbar.report.show();">\
     <i class="icon-fixed-width icon-list"></i> ' + __('Report') + '...</a></li>\
   </ul>\
  </li>');
    },
    make_history: function() {
        frappe.ui.toolbar.recent = new frappe.ui.toolbar.RecentDocs();
    },
    make_bookmarks: function() {
        frappe.ui.toolbar.bookmarks = new frappe.ui.toolbar.Bookmarks();
    },
    make_help: function() {
        $('.navbar').append('<ul class="nav navbar-nav pull-right"><li class="dropdown">\
   <a class="dropdown-toggle" data-toggle="dropdown" href="#" \
    title="' + __("Help") + '"\
    onclick="return false;">' + __("Help") + '</a>\
   <ul class="dropdown-menu" id="toolbar-help"> \
    <li><a href="#" onclick="return frappe.ui.toolbar.show_about();">\
     <i class="icon-fixed-width icon-info-sign"></i> ' + __('About') + '</a></li>\
    <li><a href="https://frappe.io" target="_blank" data-link="docs">\
     <i class="icon-fixed-width icon-file"></i> ' + __('Documentation') + '</a></li> \
    <li><a href="http://frappe.io/getting-help" target="_blank">\
     <i class="icon-fixed-width icon-question-sign"></i> ' + __('Forums') + '</a></li> \
     <li><a href="http://github.com/frappe/erpnext/issues" target="_blank">\
      <i class="icon-fixed-width icon-warning-sign"></i> ' + __('Report an Issue') + '</a></li> \
    <li class="divider"></li> \
    <li><a href="#" onclick="return frappe.ui.toolbar.clear_cache();">\
     <i class="icon-fixed-width icon-refresh"></i> ' + __('Clear Cache') + '</a></li>\
   </ul>\
  </li></ul>');
    },
    set_user_name: function() {
        $('#toolbar-user-name').html('<img src="' + frappe.user_info().image + '" style="max-width: 24px; max-height: 24px; margin: -2px 0px;">');
    },
    make_user_menu: function() {
        this.set_user_name();
        $(repl('<li><a href="#%(user_form)s">\
    <i class="icon-fixed-width icon-user"></i>%(my_settings)s</a></li>\
   <li><a href="/index"> \
    <i class="icon-fixed-width icon-globe"></i>%(website)s</a></li>\
   <li class="divider"></li>\
   <li><a href="#" onclick="return frappe.app.logout();"> \
    <i class="icon-fixed-width icon-signout"></i>%(logout)s</a></li>', {
            "logout": __('Logout'),
            "website": __('Switch to Website'),
            "user_form": encodeURIComponent("Form/User/" + user),
            "my_settings": __("My Settings")
        })).appendTo("#toolbar-user");
    },
    make_logout: function(){
        $('.navbar:last .nav:last').append('<li class="dropdown dropdown-quick-sidebar-toggler">\
          <a href="#" class="dropdown-toggle" onclick="return frappe.app.logout();">\
            <i class="fa fa-sign-out"></i>\
          </a>\
       </li>')
    },
    make_home_icon: function(){
      $('.navbar .nav:first').prepend('<li class="dropdown dropdown-extended dropdown-inbox">\
          <a href="/desk" data-name="Home">\
            <i class="fa fa-home"></i>\
              <span class="title"></span>\
          </a>\
        </li>')

    }
});
$.extend(frappe.ui.toolbar, {
	add_dropdown_button: function(parent, label, click, icon) {
		var menu = frappe.ui.toolbar.get_menu(parent);
		if(menu.find("li:not(.custom-menu)").length && !menu.find(".divider").length) {
			frappe.ui.toolbar.add_menu_divider(menu);
		}

		return $('<li class="custom-menu"><a><i class="icon-fixed-width '
			+icon+'"></i> '+label+'</a></li>')
			.insertBefore(menu.find(".divider"))
			.find("a")
			.click(function() {
				click.apply(this);
			});
	},
	get_menu: function(label) {
		return $("#navbar-" + label.toLowerCase());
	},
	add_menu_divider: function(menu) {
		menu = typeof menu == "string" ?
			frappe.ui.toolbar.get_menu(menu) : menu;

		$('<li class="divider custom-menu"></li>').prependTo(menu);
	},
})

frappe.ui.toolbar.update_notifications = function() {
	var total = 0;
	var doctypes = keys(frappe.boot.notification_info.open_count_doctype).sort();
	var modules = keys(frappe.boot.notification_info.open_count_module).sort();

	$("#navbar-notification").empty();

	$.each(modules, function(i, module) {
		var count = frappe.boot.notification_info.open_count_module[module];
		if(count) {
			$(repl('<li><a>\
				<span class="badge pull-right">\
					%(count)s</span> \
				<i class="icon-fixed-width %(icon)s"></i> %(module)s </a></li>', {
					module: __(module),
					count: count,
					icon: frappe.modules[module].icon
				}))
				.appendTo("#navbar-notification")
					.find("a")
					.attr("data-module", module)
					.css({"min-width":"200px"})
					.on("click", function() {
						frappe.set_route(frappe.modules[$(this).attr("data-module")].link);
					});
			total += count;
		}
	});

	if(total) {
		$('<li class="divider"></li>').appendTo("#navbar-notification");
	}

	$.each(doctypes, function(i, doctype) {
		var count = frappe.boot.notification_info.open_count_doctype[doctype];
		if(count) {
			$(repl('<li><a>\
				<span class="badge pull-right">\
					%(count)s</span> \
				<i class="icon-fixed-width %(icon)s"></i> %(doctype)s </a></li>', {
					doctype: __(doctype),
					icon: frappe.boot.doctype_icons[doctype],
					count: count
				}))
				.appendTo("#navbar-notification")
					.find("a")
					.attr("data-doctype", doctype)
					.css({"min-width":"200px"})
					.on("click", function() {
						frappe.views.show_open_count_list(this);
					});
			total += count;
		}
	});

	$(".navbar-new-comments")
		.html(total)
		.toggleClass("navbar-new-comments-true", total ? true : false);

}

frappe.ui.toolbar.clear_cache = function() {
	localStorage && localStorage.clear();
	$c('frappe.sessions.clear',{},function(r,rt){
		if(!r.exc) {
			show_alert(r.message);
			location.reload();
		}
	});
	return false;
}

frappe.ui.toolbar.download_backup = function() {
	msgprint(__("Your download is being built, this may take a few moments..."));
	return $c('frappe.utils.backups.get_backup',{},function(r,rt) {});
	return false;
}

frappe.ui.toolbar.show_about = function() {
	try {
		frappe.ui.misc.about();
	} catch(e) {
		console.log(e);
	}
	return false;
}


frappe.ui.toolbar.show_banner = function(msg) {
	$banner = $('<div class="toolbar-banner">'+msg+'<a class="close">&times;</a></div>')
		.prependTo($('header .navbar'));
		$("body").css({"padding-top": "70px"});
	$banner.find(".close").click(function() {
		$(".toolbar-banner").toggle(false);
		$("body").css({"padding-top": "36px"});
	});
	return $banner;
}
frappe.ui.set_container_width = function() {
    if (($("header ul#sidebar_items").css("width") == "0px")||($("header ul#sidebar_items").css("width") == undefined)) {
        $(".page-container").css("margin-left", "50px")
        $(".page-container").css("width", "90%")
        //$(".page-container:last .container").css("margin-left", "10px")
        $(".page-container:last .container:first").css("max-width", "90%")
    } else if($("header ul#sidebar_items").hasClass("page-sidebar-menu-closed")){
        $(".page-container").css("margin-left", "63px")
        $(".page-container").css("width", "90%")
        //$(".page-container:last .container").css("margin-left", "10px")
        $(".page-container .container:first").css("max-width", "100%")
    }else {
        $(".page-container").css("margin-left", "148px")
        $(".page-container").css("width", "90%")
        //$(".page-container:last .container").css("margin-left", "118px")
        $(".page-container:visible .container:first").css("max-width", "90%")
        $(".page-container:visible .container:first").css("width", "92%")
    }
}
frappe.ui.make_sidebar = function(module) {
    module = (frappe.get_cookie("module"));
    $(".page-sidebar-wrapper").remove()
    if ((frappe.modules[module] && frappe.modules[module].type) == "module") {
        document.cookie = "module=" + module;
        frappe.call({
            method: "frappe.widgets.moduleview.get",
            args: {
                module: module
            },
            callback: function(r) {
                $(".page-container").css("margin-left", "50px")
                $('<div class="page-sidebar-wrapper" style="width: 8%;">\
                 <div class="page-sidebar navbar-collapse collapse" style=" background-color:#364150;">\
                   <ul id="sidebar_items" class="page-sidebar-menu" data-keep-expanded="false" data-auto-scroll="true" data-slide-speed="200" style="position: absolute; top: 0px; bottom: 0px;width: 193px; z-index: 9999; display: none;">\
                     <li class="sidebar-toggler-wrapper">\
                        <div class="sidebar-toggler">\
                        </div>\
                    </li>\
                    </ul>\
                  </div>\
                </div>').appendTo("header")
                $.each(r.message.data, function(i, item) {
                    if (item) {
                        list = $('<li class="start">\
                   <a href="javascript:;">\
                     <i class="' + item.icon + '">\
                     </i>\
                     <span class="title">\
                       ' + item.label + '\
                     </span>\
                     <span class="arrow "></span>\
                  </a>\
                  </li>')
                        sublist = $('<ul class="sub-menu"></ul>')
                        sublinks = ''
                        $.each(item.items, function(index, inner_item) {
                            link = frappe.item_route(inner_item)
                            sublinks += '<li class="">\
                              <a href="#' + link + '">\
                                <i class="' + frappe.item_icon(inner_item) + '"></i>\
                                ' + (inner_item.label || inner_item.name) + '</a>\
                        </li>'
                        })
                        $(sublinks).appendTo(sublist)
                        $(sublist).appendTo(list)
                        $(list).appendTo("#sidebar_items")
                        $('ul#sidebar_items').height($(document).height());
                    }
                })
            }
        });
        $("body").removeClass("page-sidebar-closed");
    } else {
        window.location.href = "/desk#" + frappe.get_module(module).link;
        frappe.ui.set_container_width();
    }
    setTimeout(function() {
        $('body').off('click', '.sidebar-toggler');
        Layout.init();
        QuickSidebar.init();
        $('ul#sidebar_items').show()
        frappe.ui.set_container_width();
    }, 1000);
}
frappe.item_route = function(item){
    route = ""
    if (item.type === "doctype") {
        route = "List/" + encodeURIComponent(item.name);
    } else if (item.type === "page") {
        route = item.route || item.link || item.name;
    } else if (item.type === "report") {
        if (item.is_query_report) {
            route = "query-report/" + encodeURIComponent(item.name);
        } else {
            route = "Report/" + encodeURIComponent(item.doctype) + "/" + encodeURIComponent(item.name);
        }
    }
    return(route)
}

frappe.item_icon = function(item){
    if (item.type === "doctype") {
        item.icon = item.icon || frappe.boot.doctype_icons[item.name];
    } else if (item.type === "report" && item.doctype) {
        item.icon = item.icon || frappe.boot.doctype_icons[item.doctype];
    }
    return(item.icon)
}

$(document).on("click",".sidebar-toggler",function(){
    frappe.ui.set_container_width();
    if($(this).closest(".page-sidebar-menu").hasClass("page-sidebar-menu-closed")){
        $(".app-page").width("100%")
    }else{
        $(".app-page").width("90%")
    }
})
$(document).on("click","#sidebar_items li",function(){
  frappe.ui.set_container_width();
  setTimeout(function() {
    $("#sidebar_items").css("height",$(document).height()+"px")
    }, 1000)
})
$(document).ready(function(){
  frappe.ui.set_container_width();
})

