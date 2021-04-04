---
title: Integration
---

Meta Box and extensions can be used as standalone plugins or integrated with other themes / plugins. There are 2 ways to do that:

## Using TGM Activation Class

The [TGM Activation Class](https://tgmpluginactivation.com) allows developers declare Meta Box as a dependency for their themes / plugins. To use the class, follow these steps:

1. Download the [TGM Activation Class](http://tgmpluginactivation.com/download/). Make sure you select "Plugin" for the option "I'm going to use TGMPA in a:".
1. Extract the downloaded `.zip` file and copy the file `class-tgm-plugin-activation.php` and `example.php` to your theme / plugin folder. You should rename `example.php` file to something else for easier understanding.
1. Open the `example.php` file and add plugins to the plugin list:

```php
require_once __DIR__ . '/class-tgm-plugin-activation.php';
add_action( 'tgmpa_register', 'prefix_register_required_plugins' );
function prefix_register_required_plugins() {
    $plugins = [
        [
            'name'     => 'Meta Box',
            'slug'     => 'meta-box',
            'required' => true,
        ],
        [
            'name'     => 'Extension Name', // The plugin name.
            'slug'     => 'extension-slug', // The plugin slug (typically the folder name).
            'source'   => get_stylesheet_directory() . '/plugins/extension.zip', // The plugin source.
            'required' => true, // If false, the plugin is only 'recommended' instead of required.
        ],
        // More plugins
    ];
    $config  = [
        'id' => 'your-id',
    ];
    tgmpa( $plugins, $config );
}
```

Remember to change the extension slug and name to the correct slug and name of the extension(s) you want to include. For more information about the syntax, please read [TGM Activation Class's documentation](https://tgmpluginactivation.com/configuration/).

Finally, include the `example.php` file in your theme's `functions.php` or your plugin's main file.

Now when users install your theme or plugin, they will be prompted to install Meta Box plugin from wordpress.org. After that, your theme or plugin are ready to use Meta Box.

## Bundling plugins

To bundle the Meta Box and extensions into your theme or plugin, follow the steps below:

1. Copy the plugin folder to your theme or plugin. It doesn't matter if you put it in the theme root folder or in a subfolder.
1. Include the Meta Box's main file (or the extension's main file) by putting the following line into the `functions.php` of your theme or your plugin's file:

```php
require get_template_directory() . '/meta-box/meta-box.php';
```

Although this method works, it has some disadvantages compared to the 1st method:

- You have to **manually** update the included version of Meta Box when it's updated.
- If users install Meta Box from wordpress.org or it's included in another plugin, your code **might be not compatible** with those versions.

{% include alert.html type="warning" content="**Important:** This method is NOT recommended and is a bad practice. Use with your own risks. We recommend using TGM Activation Class for better compatibility." %}

## Using Composer

Please [read this detailed guide](https://docs.metabox.io/composer/) for instructions.
