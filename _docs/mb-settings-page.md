---
title: MB Settings Page
---

{% include installation.html %}

After installing, you need to register a settings page and register meta boxes (and fields) for that settings page.

## Register settings page

Registering a settings page is done by filter `mb_settings_pages`. The code to add a settings page looks like this (this registers a theme options page under Appearance menu):

```php
add_filter( 'mb_settings_pages', 'prefix_options_page' );
function prefix_options_page( $settings_pages ) {
    $settings_pages[] = array(
        'id'          => 'theme-slug',
        'option_name' => 'theme_slug',
        'menu_title'  => __( 'Theme Options', 'textdomain' ),
        'parent'      => 'themes.php',
    );
    return $settings_pages;
}
```

The filter **takes an array of defined settings pages as the argument**. The callback function **must return an array of settings pages**.

Each settings page is defined by an array of the following options:

Name|Description
---|---
`id`|Page ID. Required. Will be used as the slug in URL and option name (if `option_name` missed).
`option_name`|Option name where settings data is saved to. Optional. Takes `id` if missed. If you want to use theme mods, then set this to `theme_mods_$themeslug`.
`menu_title`|Menu title. Optional. Takes `page_title` if missed.
`page_title`|Page title. Optional. Takes `menu_title` if missed. Note: either `menu_title` or `page_title` (or both) must have value.
`capability`|Required capability to access the settings page. Optional. Default `edit_theme_options`.
`icon_url`|The icon for the menu. To use <a href="https://developer.wordpress.org/resource/dashicons/">a Dashicon</a>, set this to `dashicon-icon-name`. To use a SVG data image as a CSS background, set this to `data:image/svg+xml;base64...`. To use an image, set this to image URL. See `icon_url` parameter of <a href="http://codex.wordpress.org/Function_Reference/add_menu_page">add_menu_page()</a> function.
`position`|Menu position. See `position` parameter of <a href="http://codex.wordpress.org/Function_Reference/add_menu_page">add_menu_page()</a> function.
`parent`|ID of the parent page. Optional. Can be WordPress menu or custom settings page menu. See examples below for more details.
`submenu_title`|Set this to the default submenu title (first submenu) if the settings page is a top-level menu. Optional.
`help_tabs`|List of help tabs. Array in format `'tab-id' => 'Tab Content'`. Optional.
`style`|How do you want to style the settings page. Supports `boxes` which has same the style as normal WordPress meta boxes (like in the edit post screen) and `no-boxes` which has the same style as WordPress settings page. In `no-boxes` style, each meta box is a section of the settings page.
`columns`| The number of columns in the meta boxes. Can be 1 or 2. You might want to use 1 column with `no-boxes` style to match WordPress style.
`tabs`|Organized meta boxes and fields in tabs (see the example below). This param takes an array of (tab_id => Tab Title). Note: when using this param, you **must** specify which tab the meta box belongs by adding a new parameter `'tab' => tab_id`. See example below.
`submit_button`|The custom text for submit button. Optional.
`message`|The custom message displayed when saving options. Optional.


### Examples

This example registers a top-level menu pages and 2 sub settings page:

```php
add_filter( 'mb_settings_pages', 'prefix_settings_pages' );
function prefix_settings_pages( $settings_pages ) {
    $settings_pages[] = array(
        'id'            => 'my-options',
        'option_name'   => 'my_options',
        'menu_title'    => __( 'Options', 'textdomain' ),
        'icon_url'      => 'dashicons-images-alt',
        'submenu_title' => __( 'Settings', 'textdomain' ), // Note this
    );
    $settings_pages[] = array(
        'id'          => 'my-options-im',
        'option_name' => 'my_options',
        'menu_title'  => __( 'Import', 'textdomain' ),
        'parent'      => 'my-options', // Note this
    );
    $settings_pages[] = array(
        'id'          => 'my-options-ex',
        'option_name' => 'my_options',
        'menu_title'  => __( 'Export', 'textdomain' ),
        'parent'      => 'my-options',
    );
    return $settings_pages;
}
```

Here is the result:

![registrer settings pages](http://i.imgur.com/3nKuSE4.png)

Note that:

- The `submenu_title` allows us to set the first submenu of the menu to Settings (while the top-level menu is Options).
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

## Register settings meta boxes and fields

Registering settings meta boxes and fields for settings pages is the same as for posts. You need to hook to `rwmb_meta_boxes` and set a param `settings_pages` to the settings page(s) you want to add to.

The sample code is below:

```php
add_filter( 'rwmb_meta_boxes', 'prefix_options_meta_boxes' );
function prefix_options_meta_boxes( $meta_boxes ) {
    $meta_boxes[] = array(
        'id'             => 'general',
        'title'          => __( 'General', 'textdomain' ),
        'settings_pages' => 'theme-slug',
        'fields'         => array(
            array(
                'name' => __( 'Logo', 'textdomain' ),
                'id'   => 'logo',
                'type' => 'file_input',
            ),
            array(
                'name'    => __( 'Layout', 'textdomain' ),
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
    $meta_boxes[] = array(
        'id'             => 'colors',
        'title'          => __( 'Colors', 'textdomain' ),
        'settings_pages' => 'theme-slug',
        'fields'         => array(
            array(
                'name' => __( 'Heading Color', 'textdomain' ),
                'id'   => 'heading-color',
                'type' => 'color',
            ),
            array(
                'name' => __( 'Text Color', 'textdomain' ),
                'id'   => 'text-color',
                'type' => 'color',
            ),
        ),
    );

    $meta_boxes[] = array(
        'id'             => 'info',
        'title'          => __( 'Theme Info', 'textdomain' ),
        'context'        => 'side',
        'settings_pages' => 'theme-slug',
        'fields'         => array(
            array(
                'type' => 'custom_html',
                'std'  => '<img src="http://placehold.it/260x150?text=Thumbnail">' . __( '<strong>%Name%</strong> is a responsive theme for businesses and agencies. Built with HTML5, SASS and other latest technologies.<br><br><a href="http://domain.com" target="_blank" class="button-primary">Learn more</a>', 'textdomain' ),
            )
        ),
    );
    return $meta_boxes;
}
```

Note:

- You **must** set `settings_pages` to the ID of the settings page. If you want to add meta boxes to 2 or more settings pages, set it to an array of settings pages' IDs
- All options for fields stay unchanged.
- The settings page uses 2 columns layout, which mimic WordPress post screen and the value for `context` has the same meaning.

## Using tabs

The example below registers 1 top level settings page with 3 tabs. Each tabs has one meta box. The style is set to `no-boxes` and `columns` is set to 1 to match WordPress style:

```php
// Register settings page. In this case, it's a theme options page
add_filter( 'mb_settings_pages', 'prefix_options_page' );
function prefix_options_page( $settings_pages ) {
    $settings_pages[] = array(
        'id'          => 'pencil',
        'option_name' => 'pencil',
        'menu_title'  => __( 'Pencil', 'textdomain' ),
        'icon_url'    => 'dashicons-edit',
        'style'       => 'no-boxes',
        'columns'     => 1,
        'tabs'        => array(
            'general' => __( 'General Settings', 'textdomain' ),
            'design'  => __( 'Design Customization', 'textdomain' ),
            'faq'     => __( 'FAQ & Help', 'textdomain' ),
        ),
        'position'    => 68,
    );
    return $settings_pages;
}

// Register meta boxes and fields for settings page
add_filter( 'rwmb_meta_boxes', 'prefix_options_meta_boxes' );
function prefix_options_meta_boxes( $meta_boxes ) {
    $meta_boxes[] = array(
        'id'             => 'general',
        'title'          => __( 'General', 'textdomain' ),
        'settings_pages' => 'pencil',
        'tab'            => 'general',

        'fields' => array(
            array(
                'name' => __( 'Logo', 'textdomain' ),
                'id'   => 'logo',
                'type' => 'file_input',
            ),
            array(
                'name'    => __( 'Layout', 'textdomain' ),
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
    $meta_boxes[] = array(
        'id'             => 'colors',
        'title'          => __( 'Colors', 'textdomain' ),
        'settings_pages' => 'pencil',
        'tab'            => 'design',

        'fields' => array(
            array(
                'name' => __( 'Heading Color', 'textdomain' ),
                'id'   => 'heading-color',
                'type' => 'color',
            ),
            array(
                'name' => __( 'Text Color', 'textdomain' ),
                'id'   => 'text-color',
                'type' => 'color',
            ),
        ),
    );

    $meta_boxes[] = array(
        'id'             => 'info',
        'title'          => __( 'Theme Info', 'textdomain' ),
        'settings_pages' => 'pencil',
        'tab'            => 'faq',
        'fields'         => array(
            array(
                'type' => 'custom_html',
                'std'  => __( '<strong>Having questions?</strong><br><br><a href="https://metabox.io/docs/" target="_blank" class="button-primary">Go to our documentation</a>', 'textdomain' ),
            ),
        ),
    );
    return $meta_boxes;
}
```

Here is the result:

![settings page with tabs](https://metabox.io/wp-content/uploads/2015/12/mb-settings-page-tabs.png)

## Getting settings value

### Using helper function

Since version 1.2, you're able to use [helper function `rwmb_meta`](/get-meta-value/) to get settings value.

```php
$value = rwmb_meta( $field_id, array( 'object_type' => 'setting' ), $option_name );
echo $value;
```

The code is very similar to [get post meta](/get-meta-value/). The differences are:

- In the 2nd parameter, you need to pass `'object_type' => 'setting'`, and
- In the last parameter, you need to pass the option name for the settings page

Other parameters are the same as for post. Please see [this documentation](/get-meta-value/) for details.

### Manually retrieve value

Settings values are saved in WordPress option as an array with the option name is `option_name` set when defining the settings page. The keys of that array are the fields IDs and values are the saved values.

To get the settings value, use the following code:

```php
$settings = get_option( 'option_name' );
$field_id = 'your_field_id';
if ( isset( $settings[$field_id] ) ) {
    return $settings[$field_id];
}
```

**Important Note**:

The code returns only raw data of meta value. It doesn't return meaningful information for images, file, etc. To do that, please add a small piece of code as follow:

```
// Getting images
$settings = get_option( 'option_name' );
$image_ids = $settings['images'];
foreach ( $image_ids as $image_id ) {
    $image = RWMB_Image_Field::file_info( $image_id, array( 'size' => 'thumbnail' ) );
    echo '<img src="' . $image['url'] . '" width="' . $image['width'] . '" height="' . $image['height'] . '">';
}
```

{% include helpers.html %}