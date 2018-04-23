---
title: Integration
---

The latest version of the [Meta Box premium extensions](https://metabox.io/plugins/) is safe to integrate with themes or plugins. There are 2 ways to do that:

## Using TGM Activation Class

The [TGM Activation Class](https://tgmpluginactivation.com) allows developers declare Meta Box as a dependency for their themes / plugins. To use the class, follow these steps:

1. Download the [TGM Activation Class](http://tgmpluginactivation.com/download/). Make sure you select "Plugin" for the option "I'm going to use TGMPA in a:".
1. Extract the downloaded `.zip` file and copy the file `class-tgm-plugin-activation.php` and `example.php` to your theme / plugin folder. You should rename `example.php` file to something else for easier understanding.
1. Open the `example.php` file and add Meta Box to the plugin list, like this:

```php
require_once get_template_directory() . '/class-tgm-plugin-activation.php';
add_action( 'tgmpa_register', 'prefix_register_required_plugins' );
function prefix_register_required_plugins() {
    $plugins = array(
        array(
            'name'     => 'Extension Name', // The plugin name.
            'slug'     => 'extension-slug', // The plugin slug (typically the folder name).
            'source'   => get_stylesheet_directory() . '/plugins/extension.zip', // The plugin source.
            'required' => true, // If false, the plugin is only 'recommended' instead of required.
        ),
    );
    $config = array(
        'id' => 'your-id',
    );
    tgmpa( $plugins, $config );
}
```

Remember to change the extension slug and name to the correct slug and name of the extension(s) you want to include. For more information about the syntax, please read [TGM Activation Class's documentation](https://tgmpluginactivation.com/configuration/).

## Bundling extensions

In order to include the extension directly in your theme or plugin, please follow the following steps:

1. Copy the plugin folder to your theme/plugin. It doesn't matter if you put it in the theme root folder or in a subfolder.
1. Include the extension's main file by putting the following line into the `functions.php` of your theme or your plugin's file:

```php
require get_template_directory() . '/extension-slug/extension-slug.php'; // Path to the extension's main file
```

Remember to change the extension slug to the correct slug of the extension(s) you want to include.

## Using Composer

Please [read this detailed guide](https://docs.metabox.io/extensions/composer/) for instructions.
