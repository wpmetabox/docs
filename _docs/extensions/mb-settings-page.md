---
title: MB Settings Page
---

## Overview

The MB Settings Page extension helps you to create one or multiple settings pages for your website. You can use it to create a theme options page, or a settings page for your plugin, or a custom settings page for clients' websites.

It's a wrapper of [Settings API](https://codex.wordpress.org/Settings_API) (provided by WordPress) and Meta Box, that combines the power of both platforms and provides an better and simpler way to create a settings page. Briefly, it helps you create a settings page via a short and beautiful PHP syntax without going through all the low-level functions of the Settings API. Besides it supports all the field types in Meta Box as well as other [extensions](https://metabox.io/plugins/).

These are the screenshots:

**Tab style** (the default WordPress style for settings page):

![settings page with tabs](https://i.imgur.com/yb9Admk.png)

**Left tab navigation** (often seen in theme options page):

![left tab navigation for theme options](https://i.imgur.com/QoaD4la.png)

**Boxed style** (the WordPress style for meta boxes):

![settings page boxed style](https://i0.wp.com/metabox.io/wp-content/uploads/2015/12/settings-page.jpg)

For more info, please see the [extension page](https://metabox.io/plugins/mb-settings-page/).

{% include installation.html %}

After installing, you need to register a settings page and register meta boxes (and fields) for that settings page.

## Quick example

Just copy and paste the code below to your theme's `functions.php` file, or your plugin file:

```php
// Register a theme options page
add_filter( 'mb_settings_pages', function ( $settings_pages ) {
    $settings_pages[] = array(
        'id'          => 'pencil',
        'option_name' => 'pencil',
        'menu_title'  => 'Pencil',
        'icon_url'    => 'dashicons-edit',
        'style'       => 'no-boxes',
        'columns'     => 1,
        'tabs'        => array(
            'general' => 'General Settings',
            'design'  => 'Design Customization',
            'faq'     => 'FAQ & Help',
        ),
    );
    return $settings_pages;
} );

// Register meta boxes and fields for settings page
add_filter( 'rwmb_meta_boxes', function ( $meta_boxes ) {
    $meta_boxes[] = array(
        'id'             => 'general',
        'title'          => 'General',
        'settings_pages' => 'pencil',
        'tab'            => 'general',
        'fields' => array(
            array(
                'name' => 'Logo',
                'id'   => 'logo',
                'type' => 'file_input',
            ),
            array(
                'name'    => 'Layout',
                'id'      => 'layout',
                'type'    => 'image_select',
                'options' => array(
                    'sidebar-left'  => 'https://i.imgur.com/Y2sxQ2R.png',
                    'sidebar-right' => 'https://i.imgur.com/h7ONxhz.png',
                    'no-sidebar'    => 'https://i.imgur.com/m7oQKvk.png',
                ),
            ),
        ),
    );
    $meta_boxes[] = array(
        'id'             => 'colors',
        'title'          => 'Colors',
        'settings_pages' => 'pencil',
        'tab'            => 'design',
        'fields' => array(
            array(
                'name' => 'Heading Color',
                'id'   => 'heading-color',
                'type' => 'color',
            ),
            array(
                'name' => 'Text Color',
                'id'   => 'text-color',
                'type' => 'color',
            ),
        ),
    );
    $meta_boxes[] = array(
        'id'             => 'info',
        'title'          => 'Theme Info',
        'settings_pages' => 'pencil',
        'tab'            => 'faq',
        'fields'         => array(
            array(
                'type' => 'custom_html',
                'std'  => 'Having questions? Check out our documentation',
            ),
        ),
    );
    return $meta_boxes;
} );
```

Now refresh the admin page and you'll see a new settings page **Pencil** appeared in the main menu, like this:

![settings page with tabs](https://i.imgur.com/yb9Admk.png)

## Creating settings pages

Creating a settings page is done by filter `mb_settings_pages`. The code to add a settings page looks like this (this registers a theme options page under Appearance menu):

```php
add_filter( 'mb_settings_pages', function ( $settings_pages ) {
    $settings_pages[] = [
        'id'          => 'theme-slug',
        'option_name' => 'theme_slug',
        'menu_title'  => 'Theme Options',
        'parent'      => 'themes.php',
    ];
    return $settings_pages;
} );
```

The filter takes an array of defined settings pages as the argument. The callback function must return an array of settings pages.

Each settings page is defined by an array of the following options:

Name|Description
---|---
`id`|Page ID. Required. Will be used as the slug in URL and option name (if `option_name` missed).
`option_name`|Option name where settings data is saved to. Optional. Takes `id` if missed. If you want to use theme mods, then set this to `theme_mods_$themeslug`.
`class`|Custom CSS for the wrapper div.
`menu_title`|Menu title. Optional. Takes `page_title` if missed.
`page_title`|Page title. Optional. Takes `menu_title` if missed. Note: either `menu_title` or `page_title` (or both) must have value.
`capability`|Required capability to access the settings page. Optional. Default `edit_theme_options`.
`icon_url`|The icon for the menu. To use [a Dashicon](https://developer.wordpress.org/resource/dashicons/), set this to `dashicons-icon-name`. To use a SVG data image as a CSS background, set this to `data:image/svg+xml;base64...`. To use an image, set this to image URL. See `icon_url` parameter of [add_menu_page()](https://codex.wordpress.org/Function_Reference/add_menu_page) function.
`position`|Menu position. See `position` parameter of [add_menu_page()](https://codex.wordpress.org/Function_Reference/add_menu_page) function.
`parent`|ID of the parent page. Optional. Can be WordPress menu or custom settings page menu. See examples below for more details.
`submenu_title`|Set this to the default submenu title (first submenu) if the settings page is a top-level menu. Optional.
`help_tabs`|The content displayed when clicking on the Help button on the top right (near the Screen Options button). See below for details.
`style`|How do you want to style the settings page. Supports `boxes` which has same the style as normal WordPress meta boxes (like in the edit post screen) and `no-boxes` which has the same style as WordPress settings page. In `no-boxes` style, each meta box is a section of the settings page.
`columns`| The number of columns in the meta boxes. Can be 1 or 2. You might want to use 1 column with `no-boxes` style to match WordPress style.
`tabs`|Organized meta boxes and fields in tabs. This param takes an array of tab in either format `['tab-id' => 'Tab Label']` or `['tab-id' => ['label' => 'Tab Label', 'icon' => 'dashicons-email']]`. Note: when using this param, you must specify which tab the meta box belongs by adding a new parameter `'tab' => tab_id`. See **Using Tabs** section below for details.
`tab_style`|Specify the tab style, value can be `default` (WordPress-native style where tabs are horizontal) or `left` (tabs are put on the left of the settings page). See **Using Tabs** section below for details.
`submit_button`|The custom text for submit button. Optional.
`message`|The custom message displayed when saving options. Optional.
`customizer`|Whether to show the settings page in the Customizer as a panel. `true` or `false` (default). Optional. See below for details.
`customizer_only`|Whether to show only as a Customizer panel, no admin settings page. `true` or `false` (default). Optional.
`network`|Make the settings page network-wide (in multisite environment). `true` or `false` (default). Optional.


### Examples

This example registers a top-level menu pages and 2 sub settings page:

```php
add_filter( 'mb_settings_pages', function ( $settings_pages ) {
    $settings_pages[] = array(
        'id'            => 'my-options',
        'menu_title'    => 'Options',
        'option_name'   => 'my_options',
        'icon_url'      => 'dashicons-images-alt',
        'submenu_title' => 'Options', // Note this
    );
    $settings_pages[] = array(
        'id'          => 'my-options-im',
        'option_name' => 'my_options',
        'menu_title'  => 'Import',
        'parent'      => 'my-options', // Note this
    );
    $settings_pages[] = array(
        'id'          => 'my-options-ex',
        'option_name' => 'my_options',
        'menu_title'  => 'Export',
        'parent'      => 'my-options',
    );
    return $settings_pages;
} );
```

Here is the result:

![registrer settings pages](https://i.imgur.com/5M3cwut.png)

Note that:

- The `submenu_title` allows us to set the first submenu text which can be different from the top-level menu text.
- The `parent` of submenus are set to the ID of top-level menu (`my-options`).

In case you want to add submenu to existing WordPress pages, set the `parent` option to:

Value|Page
---|---
`index.php`|Dashboard
`edit.php`|Posts
`upload.php`|Media
`link-manager.php`|Links
`edit.php?post_type=page`|Pages
`edit-comments.php`|Comments
`edit.php?post_type=your_post_type`|Custom post type
`themes.php`|Apperance
`plugins.php`|Plugins
`users.php`|Uses
`tools.php`|Tools
`options-general.php`|Settings


### Help tabs

WordPress has a nice feature that allows us to define instruction, guidelines in the "Help" section of each admin screen. To see the help content, click on the "Help" button on the top right, near the "Screen Options" button. Note that, the button appears only when there's some help content.

With **MB Settings Page**, you're able to define the help content. The content is divided into tabs. To define the tabs and their content, use the following structure:

```php
'help_tabs' => array(
    array(
        'title'   => 'General',
        'content' => '<p>This tab displays the general information about the theme.</p>',
    ),
    array(
        'title'   => 'Homepage',
        'content' => '<p>This tab displays the instruction for setting up the homepage.</p>',
    ),
),
```

In short, each tab is an array of `title` and `content`. You can pass more parameters just like the [add_help_tab()](https://codex.wordpress.org/Class_Reference/WP_Screen/add_help_tab) function. However, the `title` and `content` are the most important parameters and they're required.

Then when clicking "Help" button, you'll see:

![wordpress admin page help tabs](https://i.imgur.com/c7bIf3P.png)

## Creating settings fields

Creating settings meta boxes and fields for settings pages is the same as [for posts](https://docs.metabox.io/creating-meta-boxes/). You need to hook to `rwmb_meta_boxes` and set a param `settings_pages` to the settings page(s) you want to add to.

The sample code is below:

```php
add_filter( 'rwmb_meta_boxes', function ( $meta_boxes ) {
    $meta_boxes[] = array(
        'id'             => 'general',
        'title'          => 'General',
        'settings_pages' => 'theme-slug',
        'fields'         => array(
            array(
                'name' => 'Logo',
                'id'   => 'logo',
                'type' => 'file_input',
            ),
            array(
                'name'    => 'Layout',
                'id'      => 'layout',
                'type'    => 'image_select',
                'options' => array(
                    'sidebar-left'  => 'https://i.imgur.com/Y2sxQ2R.png',
                    'sidebar-right' => 'https://i.imgur.com/h7ONxhz.png',
                    'no-sidebar'    => 'https://i.imgur.com/m7oQKvk.png',
                ),
            ),
        ),
    );
    $meta_boxes[] = array(
        'id'             => 'colors',
        'title'          => 'Colors',
        'settings_pages' => 'theme-slug',
        'fields'         => array(
            array(
                'name' => 'Heading Color',
                'id'   => 'heading-color',
                'type' => 'color',
            ),
            array(
                'name' => 'Text Color',
                'id'   => 'text-color',
                'type' => 'color',
            ),
        ),
    );
    $meta_boxes[] = array(
        'id'             => 'info',
        'title'          => 'Theme Info',
        'context'        => 'side',
        'settings_pages' => 'theme-slug',
        'fields'         => array(
            array(
                'type' => 'custom_html',
                'std'  => 'A responsive theme for businesses and agencies.',
            )
        ),
    );
    return $meta_boxes;
} );
```

Note:

- You must set `settings_pages` to the ID of the settings page. If you want to add meta boxes to 2 or more settings pages, set it to an array of settings pages' IDs
- All fields settings stay unchanged.
- The settings page uses 2 columns layout, which mimic WordPress post screen and the value for `context` has the same meaning.

## Using tabs

To create tabs for your settings page, you need to set the `tabs` parameter. This parameter is an array of tabs. Each tab can be a simple text (for label) or an array of label and icon.

For example:

Simple tabs with no icons:

```php
'tabs'        => [
    'general' => 'General Settings',
    'design'  => 'Design Customization',
    'faq'     => 'FAQ & Help',
],
```

Tabs with icons:

```php
'tabs'        => [
    'general' => [
        'label' => 'General Settings',
        'icon'  => 'dashicons-admin-settings',
    ],
    'design'  => [
        'label' => 'Design Customization',
        'icon'  => 'dashicons-admin-customizer',
    ],
    'faq'    => [
        'label' => 'FAQ & Help',
        'icon'  => 'http://i.imgur.com/nJtag1q.png',
    ],
],
```

If use the 2nd format, then `icon` parameter can be a [Dashicons](https://developer.wordpress.org/resource/dashicons/) icon or URL of your custom icon. You can also use other icon library like FontAwesome by specifying its class (e.g. `fa fa-home`), but in that case, you have to enqueue the font yourself.

You can also make your settings page looks exactly like a normal WordPress page by setting the `style` to `no-boxes` and `columns` to `1`. See this screenshot:

![settings page with tabs](https://i.imgur.com/yb9Admk.png)

In combination with `tabs`, you can set the `tab_style` parameter to specify the position of the tab navigation, which can be `default` or `left`.

This screenshot shows the left tab navigation with icons:

![left tab navigation](https://i.imgur.com/QoaD4la.png)

{% include alert.html type="warning" content="**Important:** When using tabs, you must define `tab` attribute for all meta boxes to make them appear in corresponding tabs. Missing `tab` attribute makes the meta boxes hidden." %}

## Creating Customizer Settings

This is a quick video that demonstrate how to use MB Settings Page to create custom panels, sections and fields in the Customizer. You'll see how easy it is to turn a settings page into a Customizer panel.

<iframe width="560" height="315" src="https://www.youtube.com/embed/LeV0CsiTe74" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### Creating A Customizer Panel

The idea behind Customizer support is map a settings page to a Customizer panel. And each meta box in the settings page will be a Customizer section. The mapping is quite simple, clear, but very powerful. It allows you to bring everything in a settings page into the Customizer with a single line of code.

Assuming you have a settings page, registered with this code:

```php
add_filter( 'mb_settings_pages', function ( $settings_pages ) {
    $settings_pages[] = array(
        'id'          => 'rubik',
        'option_name' => 'theme_mods_justread',
        'menu_title'  => 'Theme Options',
        'parent'      => 'themes.php',
    );
    return $settings_pages;
} );
```

To bring it to the Customizer, simply add `'customizer' => true`, e.g.:

```php
add_filter( 'mb_settings_pages', function ( $settings_pages ) {
    $settings_pages[] = array(
        'id'          => 'rubik',
        'option_name' => 'theme_mods_justread',
        'menu_title'  => 'Theme Options',
        'parent'      => 'themes.php',
        'customizer'  => true, // THIS
    );
    return $settings_pages;
} );
```

And you’ll see a new panel in the Customizer as follows:

![A new panel in the Customizer](https://i.imgur.com/D78hKyG.png)

And each meta box in the settings page now are the Customize section:

![Meta boxes become Customize sections](https://i.imgur.com/AfaWiGK.png)

### Disabling Admin Settings Pages

When you have Customizer panels, sections and fields, you might not want to use settings pages in the WordPress admin anymore. The Customizer now becomes the all-in-one place for entering the settings and customization.

Understanding it, we added a new parameter 'customizer_only' => true that disables the admin settings page and allows only Customizer settings:

```php
add_filter( 'mb_settings_pages', function ( $settings_pages ) {
    $settings_pages[] = array(
        'id'               => 'rubik',
        'option_name'      => 'theme_mods_justread',
        'menu_title'       => 'Theme Options',
        'parent'           => 'themes.php',
        'customizer'       => true,
        'customizer_only'  => true, // THIS
    );
    return $settings_pages;
} );
```

### Creating Top-Level Customizer Sections

Sometimes you don't want the top-level panel that creates too much hierarchy (panel → sections → fields). You just want top-level sections (sections → fields). That will help users to navigate to your settings in the Customizer faster and easier.

In that case, you need to do 2 steps:

**Step 1:** Remove the code that registers settings pages as you don’t need settings pages anymore. This is the code you should remove:

```php
add_filter( 'mb_settings_pages', function ( $settings_pages ) {
    $settings_pages[] = array(
        'id'          => 'rubik',
        'option_name' => 'theme_mods_justread',
        'menu_title'  => 'Theme Options',
        'parent'      => 'themes.php',
        'customizer'  => true,
    );
    return $settings_pages;
} );
```

**Step 2:** In each meta box, replace the parameter `'settings_pages' => 'rubik'` with `'panel' => ''`.

For example, you have a meta box for your settings page, which has the following code:

```php
add_filter( 'rwmb_meta_boxes', function ( $meta_boxes ) {
    $meta_boxes[] = array(
        'id'             => 'general',
        'title'          => 'General',
        'settings_pages' => 'rubik',
        'fields'         => array(
            array(
                'name' => 'Logo',
                'id'   => 'logo',
                'type' => 'file_input',
            ),
            array(
                'name'    => 'Layout',
                'id'      => 'layout',
                'type'    => 'image_select',
                'options' => array(
                    'sidebar-left'  => 'http://i.imgur.com/Y2sxQ2R.png',
                    'sidebar-right' => 'http://i.imgur.com/h7ONxhz.png',
                    'no-sidebar'    => 'http://i.imgur.com/m7oQKvk.png',
                ),
            ),
        ),
    );
    return $meta_boxes;
} );
```

Then you need to change it to:

```php
add_filter( 'rwmb_meta_boxes', function ( $meta_boxes ) {
    $meta_boxes[] = array(
        'id'             => 'general',
        'title'          => 'General',
        'panel'          => '', // THIS
        'fields'         => array(
            array(
                'name' => 'Logo',
                'id'   => 'logo',
                'type' => 'file_input',
            ),
            array(
                'name'    => 'Layout',
                'id'      => 'layout',
                'type'    => 'image_select',
                'options' => array(
                    'sidebar-left'  => 'http://i.imgur.com/Y2sxQ2R.png',
                    'sidebar-right' => 'http://i.imgur.com/h7ONxhz.png',
                    'no-sidebar'    => 'http://i.imgur.com/m7oQKvk.png',
                ),
            ),
        ),
    );
    return $meta_boxes;
} );
```

It’s very simple, isn’t it? And you’ll see the section on the Customizer like this:

![Sections now appear as top-level in the Customizer](https://i.imgur.com/xICe0u3.png)

What if you want the _section to be inside another panel_? Like inside another plugin's panel? Simply set the `panel` parameter to ID of the target panel: `'panel' => 'panel_id'`.

### Compatibility

At the moment, all Meta Box fields are supported in the Customizer, except [file](https://docs.metabox.io/fields/file/) and [image](https://docs.metabox.io/fields/image/) field types. But other upload field types such as [file_advanced](https://docs.metabox.io/fields/file-advanced/), [file_upload](https://docs.metabox.io/fields/file-upload/), [image_advanced](https://docs.metabox.io/fields/image-advanced/), [image_upload](https://docs.metabox.io/fields/image-upload/), [single_image](https://docs.metabox.io/fields/single-image/) still work very well. (The reason is that the Customizer doesn't handle file uploads and the submission is performed via Ajax)

The good news is all the extensions such as [Meta Box Conditional Logic](https://metabox.io/plugins/meta-box-conditional-logic/), [Meta Box Tabs](https://metabox.io/plugins/meta-box-tabs/) are supported. That will help you create much better experiences for your users.

Known issues: because of the complexity, the `postMessage` transport for the Customizer is not supported yet. Your browser will refresh the whole page to see the updated settings.

## Creating Network Settings Pages

A network settings page is a settings page that provide settings for all the websites in the network (multisite environment). For example, you might want to enter Google Maps API key for all the websites, or set the contact phone number for all of them.

![Sample network settings page](https://i.imgur.com/pjZzrKf.png)

Using _MB Settings Page_, you’re now able to do that easily with just one line of code. Simply add `'network' => true` to the settings pages args. Like this:

```php
add_filter( 'mb_settings_pages', function ( $settings_pages ) {
    $settings_pages[] = array(
        'id'          => 'custom-options',
        'option_name' => 'custom_options',
        'menu_title'  => 'Custom Options',
        'icon_url'    => 'dashicons-welcome-widgets-menus',
        'network'     => true, // THIS
    );

    return $settings_pages;
} );
```

Don't forget to _network activate_ Meta Box and MB Settings Pages. And now, when you go to network admin area, you'll see a settings page like the screenshot above.

## Backup & Restore Settings

To backup the settings, you need to create a special field with `'type' => 'backup'`, like this:

```php
$meta_boxes[] = [
    'id'             => 'colors',
    'title'          => 'Colors',
    'settings_pages' => 'theme-slug',
    'fields'         => [
        [
            'name' => 'Heading Color',
            'id'   => 'heading-color',
            'type' => 'color',
        ],
        [
            'name' => 'Text Color',
            'id'   => 'text-color',
            'type' => 'color',
        ],
        [
            'name' => 'Backup',
            'type' => 'backup',
        ],
    ],
];
```

It will show a textarea field in your settings page like this:

![backup and restore settings](https://i.imgur.com/n6d6v1n.png)

When you add it to your settings page, it will show all of your settings in JSON. And you can just copy it and save to a file to backup the settings. To restore the settings, just paste the JSON again and click the Save Settings button.

The backup field inherits from [`textarea`](https://docs.metabox.io/fields/textarea/) so you can customize it the way you want: change the field name, description, input size, etc. This field doesn't require an `ID`. And of course, you should have only one backup field in your settings page.

## Hooks

**`mb_settings_page_load` action**

This action fires when a settings page is loaded. It's used internally to:

- Register meta boxes and custom fields in the settings page, and
- Save the submitted data.

These actions use the default priority `10`. So you can hook to this action to do something *after* the data is saved with a higher priority (like `20`):

```php
add_action( 'mb_settings_page_load', function ( $args ) {
    if ( $args['id'] === 'YOUR SETTINGS PAGE ID' ) {
        // Do something
    }
}, 20 );
```

**`mb_settings_page_submit_buttons` action**

This action fires after the submit button is rendered, which allows you to add more custom buttons next to the submit button.

## Data

By using Settings API, all the fields' values will be saved as an array in a single option in the WordPress's options table  with the option name is `option_name` in the settings page configuration. Each field is an element of the array with the corresponding key (field ID). It's the recommended way by WordPress that doesn't make your options table bloat.

## Getting field value

You're able to use helper function [rwmb_meta()](/rwmb-meta/) to get field value as follows:

```php
$value = rwmb_meta( $field_id, ['object_type' => 'setting'], $option_name );
echo $value;
```

For network settings, please use the following code:

```php
$value = rwmb_meta( $field_id, ['object_type' => 'network_setting'], $option_name );
echo $value;
```

Notes:

- In the 2nd parameter, you need to pass `'object_type' => 'setting'` or `'object_type' => 'network_setting'`, and
- In the last parameter, you need to pass the option name for the settings page

Other parameters are the same as for posts. Please see [this documentation](/displaying-fields/) for details.

{% include alert.html type="warning" content="It requires the extension version 1.2+ to use the helper function. If you're using an older version, please [update now](/extensions/update/)." %}

In case you use an older version than 1.2, you can get the settings manually:

```php
$settings = get_option( 'option_name' );
$field_id = 'your_field_id';
if ( isset( $settings[$field_id] ) ) {
    return $settings[$field_id];
}
```

Note that this code returns only raw data of field value. It doesn't return meaningful information for images, file, etc. To do that, please add a small piece of code as follow:

```php
// Getting images
$settings = get_option( 'option_name' );
$image_ids = $settings['images'];
foreach ( $image_ids as $image_id ) {
    $image = RWMB_Image_Field::file_info( $image_id, array( 'size' => 'thumbnail' ) );
    echo '<img src="' . $image['url'] . '">';
}
```

{% include helpers.html %}
