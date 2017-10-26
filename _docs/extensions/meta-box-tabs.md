---
title: Meta Box Tabs
---

{% include installation.html %}

## Usage

**Make sure you know how to [register meta boxes](/registering-meta-boxes/) and [define fields](/field-settings/) before continue!**

To create tabs for your meta box, you need to add 2 parameters to your meta box configuration:

- `tab_style`: Tab style. There are 3 styles available: `default` (like tabs for Categories), `box` (like tabs for Visual and Text modes of the main editor) or `left` (like tabs in Help screen). Optional. Default is `default`.

![tab styles](https://i.imgur.com/7Oi5dx1.jpg)

- `tab_wrapper`: Whether or not show the meta box wrapper around tabs. Default is `true`. If set to `false`, then the wrapper will be hidden.

![tab wrapper](https://i.imgur.com/IPzfyEY.jpg)

- `tabs`: List of tabs, in one of the following formats:
	- `'tab-id' => 'Tab label'`
	- `'tab-id' => array( 'label' => 'Tab label', 'icon' => 'Tab icon' )`

Where `tab-id` will be used in fields (below) to put fields under a tab.

If use the 2nd format, then `icon` is the tab icon. Icons are taken from [Dashicons](https://developer.wordpress.org/resource/dashicons/). The value of `icon` is the class name of Dashicons, e.g. `dashicons-email`.

If you want to use another icon (not Dashicons), either:

- set `icon` to the font icon class name. For example, if you want to use Font Awesome, set `'icon' => 'fa fa-home'`. Note that you have to enqueue the CSS for your custom font icon yourself. The plugin only supports Dashicons by default.
- set `icon` to URL of icon image, in case you want to use a custom image for tab icon

(Take a look at demo code to see how to implement)

Then for **each field** in the meta box, you need to specify which tab it belongs to by adding a parameter `'tab' => 'tab-id'` where `tab-id` is one of the tab IDs you have registered above.

The sample code looks like this:

```php
add_filter( 'textdomain_meta_boxes', 'meta_box_tabs_demo_register' );
function meta_box_tabs_demo_register( $meta_boxes ) {
	// 1st Meta Box
	$meta_boxes[] = array(
		'title'     => __( 'Meta Box Tabs Demo', 'textdomain' ),

		// List of tabs, in one of the following formats:
		// 1) key => label
		// 2) key => array( 'label' => Tab label, 'icon' => Tab icon )
		'tabs'      => array(
			'contact' => array(
				'label' => __( 'Contact', 'textdomain' ),
				'icon'  => 'dashicons-email', // Dashicon
			),
			'social'  => array(
				'label' => __( 'Social Media', 'textdomain' ),
				'icon'  => 'dashicons-share', // Dashicon
			),
			'note'    => array(
				'label' => __( 'Note', 'textdomain' ),
				'icon'  => 'https://i.imgur.com/nJtag1q.png', // Custom icon, using image
			),
		),

		// Tab style: 'default', 'box' or 'left'. Optional
		'tab_style' => 'default',

		// Show meta box wrapper around tabs? true (default) or false. Optional
		'tab_wrapper' => true,

		'fields'    => array(
			array(
				'name' => __( 'Name', 'textdomain' ),
				'id'   => 'name',
				'type' => 'text',

				// Which tab this field belongs to? Put tab key here
				'tab'  => 'contact',
			),
			array(
				'name' => __( 'Email', 'textdomain' ),
				'id'   => 'email',
				'type' => 'email',
				'tab'  => 'contact',
			),
			array(
				'name' => __( 'Facebook', 'textdomain' ),
				'id'   => 'facebook',
				'type' => 'text',
				'tab'  => 'social',
			),
			array(
				'name' => __( 'Note', 'textdomain' ),
				'id'   => 'note',
				'type' => 'textarea',
				'tab'  => 'note',
			),
		),
	);

	// 2nd Meta Box: Tab style - boxed
	$meta_boxes[] = array(
		'title'     => __( 'Meta Box Tabs 2', 'textdomain' ),
		'tabs'      => array(
			'bio'      => __( 'Biography', 'textdomain' ),
			'interest' => __( 'Interest', 'textdomain' ),
		),
		'tab_style' => 'box',
		'fields'    => array(
			array(
				'name' => __( 'Bio', 'textdomain' ),
				'id'   => 'bio',
				'type' => 'textarea',
				'tab'  => 'bio',
			),
			array(
				'name' => __( 'Interest', 'textdomain' ),
				'id'   => 'interest',
				'type' => 'textarea',
				'tab'  => 'interest',
			),
		),
	);

	// 3rd Meta Box: Tab style - left
	$meta_boxes[] = array(
		'title'     => __( 'Meta Box Tabs 3', 'textdomain' ),

		'tabs'      => array(
			'bio'      => __( 'Biography', 'textdomain' ),
			'interest' => __( 'Interest', 'textdomain' ),
			'job'      => __( 'Job', 'textdomain' ),
		),
		'tab_style' => 'left',
		'fields'    => array(
			array(
				'name' => __( 'Bio', 'textdomain' ),
				'id'   => 'bio',
				'type' => 'textarea',
				'tab'  => 'bio',
			),
			array(
				'name' => __( 'Interest', 'textdomain' ),
				'id'   => 'interest',
				'type' => 'textarea',
				'tab'  => 'interest',
			),
			array(
				'name' => __( 'Job Description', 'textdomain' ),
				'id'   => 'job_desc',
				'type' => 'textarea',
				'tab'  => 'job',
			),
		),
	);

	// 4th Meta Box: No wrapper
	$meta_boxes[] = array(
		'title'       => __( 'Meta Box Tabs 4', 'textdomain' ),
		'tabs'        => array(
			'contact' => array(
				'label' => __( 'Info', 'textdomain' ),
				'icon'  => 'dashicons-email',
			),
			'social'  => array(
				'label' => __( 'Social', 'textdomain' ),
				'icon'  => 'dashicons-share',
			),
		),
		'tab_style'   => 'box',
		'tab_wrapper' => false,
		'fields'      => array(
			array(
				'name' => __( 'Name', 'textdomain' ),
				'id'   => 'name2',
				'type' => 'text',
				'tab'  => 'contact',
			),
			array(
				'name' => __( 'Google+', 'textdomain' ),
				'id'   => 'googleplus2',
				'type' => 'text',
				'tab'  => 'social',
			),
		),
	);

	return $meta_boxes;
}
```