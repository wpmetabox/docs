---
title: Include Meta Box Plugin In Themes/Plugins
---

## Using TGM Activation Class

It's highly recommended **not** to include the plugin directly inside a WordPress theme or plugin. Including the plugin inside a theme or plugin can lead to potential problems such as:

- The plugin is being already installed on website
- Maybe the plugin is included in another plugin. In this case, we can't be sure which version of the plugin is used and that can break the website (see this [discussion](https://github.com/wpmetabox/meta-box/issues/483))

To avoid these problems, it's highly recommended using [TGM Activation Class](http://tgmpluginactivation.com/) to tell users that your theme/plugin needs the Meta Box plugin to run properly. This class is easy to use and configure (just follow the instruction at its homepage - simply copy and paste with small changes such as plugin name and slug).

This is the sample code:

```php
add_action( 'tgmpa_register', 'prefix_register_required_plugins' );
function prefix_register_required_plugins() {
    $plugins = array(
        array(
            'name'     => 'Meta Box',
            'slug'     => 'meta-box',
            'required' => true,
        ),
        // Premium extensions
        array(
            'name'     => 'Meta Box Tabs',
            'slug'     => 'meta-box-tabs',
            'source'   => get_template_directory() . '/plugins/meta-box-tabs.zip',
            'required' => false,
        ),
        // You can add more plugins here if you want
    );
    $config  = array(
        'id' => 'your-id',
    )
    tgmpa( $plugins, $config );
}
```

## Include Meta Box directly

**Since version 4.8.0**, including the Meta Box plugin directly in themes or plugins is much easier and safer than before. The version 4.8.0+ introduces a new way of loading plugin files, which is compatible with any theme and plugin.

**Note:** Although the method described here works, it's still highly recommended to use TGM Activation Class to avoid potential compatibility problems. In order to include the Meta Box plugin into your theme or plugin, please follow the following steps:

1. Copy the plugin folder `meta-box` to your theme. It doesn't matter if you put it in the theme root folder or in a subfolder.
1. Include the plugin's main file by putting the following line into the `functions.php` of your theme or your plugin's file:

```php
require get_template_directory() . '/meta-box/meta-box.php'; // Path to the plugin's main file
```

Prior to version 4.8.0, you have to define some constants for the Meta Box plugin before include the plugin's main file:

```php
define( 'RWMB_DIR', get_template_directory() . '/meta-box/' );
define( 'RWMB_URL', get_template_directory_uri() . '/meta-box/' );
require RWMB_DIR . 'meta-box.php';
```