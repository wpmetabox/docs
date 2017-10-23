---
title: Include extensions in themes or plugins
---

The latest version of the [Meta Box premium extensions](https://metabox.io/plugins/) is safe to be included in themes or plugins. There are 2 ways to do that:

### Using TGM Activation Class

This method is highly recommended. Please follow these steps:

1. Include the TGM Activation Class files into your themes/plugins.
1. Download the [TGM Activation Class](http://tgmpluginactivation.com/).
1. Add the following code into your theme's `functions.php` file or your plugin's main file

```php
require_once get_template_directory() . '/class-tgm-plugin-activation.php'; // Path to TGM Plugin Activation class.

add_action( 'tgmpa_register', 'your_prefix_register_required_plugins' );
function your_prefix_register_required_plugins() {
	$plugins = array(
		array(
			'name'     => 'Extension Name', // The plugin name.
			'slug'     => 'extension-slug', // The plugin slug (typically the folder name).
			'source'   => get_stylesheet_directory() . '/lib/plugins/extension.zip', // The plugin source.
			'required' => true, // If false, the plugin is only 'recommended' instead of required.
		),
	);
	$config = array(
		'id' => 'your-id',
	);
	tgmpa( $plugins, $config );
}
```

Remember to change the extension slug and name to the correct slug and name of the extension(s) you want to include. For more information about the syntax, please read [TGM Activation Class's documentation](http://tgmpluginactivation.com/configuration/).

### Include the extension directly

In order to include the extension directly in your theme or plugin, please follow the following steps:

1. Copy the plugin folder to your theme/plugin. It doesn't matter if you put it in the theme root folder or in a subfolder.
1. Include the extension's main file by putting the following line into the `functions.php` of your theme or your plugin's file:

```php
require get_template_directory() . '/extension-slug/extension-slug.php'; // Path to the extension's main file
```

Remember to change the extension slug to the correct slug of the extension(s) you want to include.