---
title: MB Blocks - Creating Gutenberg Blocks With PHP
---

With the help of MB Blocks, WordPress developers are now able to create Gutenberg blocks using PHP only. There is no JavaScript configuration and build process. Everything is just like [creating a simple meta box](https://docs.metabox.io/creating-meta-boxes/).

Here is a screenshot of a custom Gutenberg block (hero area) that's created using MB Blocks:

![custom Gutenberg block](https://i.imgur.com/fVTmMWi.png)

The preview of the block is displayed in the main content area while the block configuration is displayed on the right. This allows you to edit the block content and live-preview the block in real-time. Later, you can also can change where the block settings are displayed (on the sidebar or right in the main content area).

## Creating A Gutenberg Block

(Scroll down to see a video tutorial and the code example).

Creating a Gutenberg block with MB Blocks is similar to create a normal meta box. There are just a few different settings.

Assumming we're creating a hero area block (like the screenshot above). Open your theme's `functions.php` file (or your plugin's PHP file) and add the following code:

```php
add_filter( 'rwmb_meta_boxes', function( $meta_boxes ) {
	$meta_boxes[] = [
		'title'           => 'Hero Content',
		'id'              => 'hero-content',
		'description'     => 'A custom hero content block',
		'type'            => 'block',
		'icon'            => 'awards',
		'category'        => 'layout',
		'context'         => 'side',
		'render_template' => get_template_directory() . '/blocks/hero/template.php',
		'enqueue_style'   => get_template_directory_uri() . '/blocks/hero/style.css',
		'supports' => [
			'align' => ['wide', 'full'],
		],

		// Block fields.
		'fields'          => [
			[
				'type' => 'single_image',
				'id'   => 'image',
				'name' => 'Image',
			],
			[
				'type' => 'text',
				'id'   => 'title',
				'name' => 'Title',
			],
			[
				'type' => 'text',
				'id'   => 'subtitle',
				'name' => 'Subtitle',
			],
			[
				'type' => 'textarea',
				'id'   => 'content',
				'name' => 'Content',
			],
			[
				'type' => 'single_image',
				'id'   => 'signature',
				'name' => 'Signature',
			],
			[
				'type' => 'text',
				'id'   => 'button_text',
				'name' => 'Button Text',
			],
			[
				'type' => 'text',
				'id'   => 'button_url',
				'name' => 'Button URL',
			],
			[
				'type' => 'color',
				'id'   => 'background_color',
				'name' => 'Background Color',
			],
		],
	];
	return $meta_boxes;
} );
```

You might notice that the syntax is very similar to [creating a custom meta box](https://docs.metabox.io/creating-meta-boxes/). You just need to define some settings and fields for the block.

The block settings are inherited from the Block JavaScript API with a few difference. See [Block Registration](https://developer.wordpress.org/block-editor/developers/block-api/block-registration/) page on the Gutenberg Handbook if you need more details.

### `title`

The block title. It's used to dipslay the block when you click the Block Inserter in Gutenberg.

### `id`

The block ID. Must be unique.

### `icon`

The block icon. Can be any of [WordPress' Dashicons](https://developer.wordpress.org/resource/dashicons/) (without the prefix `dashicons-`), or a custom `svg` element (string) or [FontAwesome 5 free icons](https://fontawesome.com/) (added in version 1.2.0).

Example:

```php
// Specifying a dashicon for the block
'icon' => 'book-alt',

// FontAwesome 5 icon
'icon' => 'fas fa-user',

// Specifying a custom svg for the block
'icon' => '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0V0z" /><path d="M19 13H5v-2h14v2z" /></svg>',
```

If you need an advanced configure for the icon, you can set `icon` as an array which can contain background and foreground colors, this colors will appear with the icon
when they are applicable e.g.: in the inserter.

```php
'icon' => [
    // Specifying a background color to appear with the icon e.g.: in the inserter.
    'background' => '#7e70af',
    // Specifying a color for the icon (optional: if not set, a readable color will be automatically defined)
    'foreground' => '#fff',
    // Specifying a dashicon for the block
    'src' => 'book-alt',
],
```

### `description`

The block description. Optional.

### `type`

Tells Meta Box to register this as a Gutenberg block (not as a normal meta box). This must be set to `block`.

### `category`

Specify the block category, which is used to help users browse and discover them. Available values: `common`, `formatting`, `layout` (defaul), `widgets`, `embed`. If a theme or a plugin registers a custom category, you can also use it, too.

### `keywords`

List of keywords that users can use to search the block from the block inserter.

```php
// Make it easier to discover a block with keyword aliases.
'keywords' => ['image', 'photo', 'pics'],
```

### `context`

Where to show the block settings. If set to `side`, the block settings is displayed on the right sidebar when you select the block. If omitted (default), the block settings is displayed when you click the Edit icon in the block toolbar.

See the short video below to understand.

<iframe width="560" height="315" src="https://www.youtube.com/embed/FOw0bPG_jjw" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### `supports`

Custom supports for the block. This parameter accepts an array like this:

```php
'supports' => [
	'align'           => ['wide', 'full'],
	'customClassName' => true,
	'anchor'          => false,
],
```

The following parameters are available for `supports`:

#### `align`

Add supports for the block alignment. Note that your theme must add styling for the Gutenberg alignment.

```php
// Add the support for block's alignment (left, center, right, wide, full).
'align' => true,
// Pick which alignment options to display.
'align' => [ 'left', 'right', 'full' ],
```

#### `anchor`

Anchors let you link directly to a specific block on a page. This property adds a field to define an id for the block.

```php
'anchor' => true,
```

#### `customClassName`

This property adds a field to define a custom CSS class name for the block's wrapper. It's useful when you want to add custom styling for a specific instance of the block.

```php
'customClassName' => true,
```

#### `multiple`

If you want to have a block that can be inserted into each post one time only (like a hero area block), then set this parameter to `false`. A non-multiple block's icon is automatically dimmed (unclickable) to prevent multiple instances.

```php
// Use the block just once per post
multiple: false,
```

#### `reusable`

A block may want to disable the ability of being converted into a reusable block. By default all blocks can be converted to a reusable block. If supports reusable is set to `false`, the option to convert the block into a reusable block will not appear.

```php
// Don't allow the block to be converted into a reusable block.
reusable: false,
```

### `mode`

The default mode of the block: `edit` to make it shows the edit fields when loaded, `preview` (default) to show the rendered HTML when loaded.

```php
'mode' => 'edit',
```

### `render_callback`

A custom PHP callback to display the block content. The callback accepts 2 parameters:

- `$attributes`: the block attributes, which has all the block settings and fields data.
- `$is_preview`: a boolean variable to let you know if you're in the preview mode for Gutenberg or on the front end. It's useful when you want to display a custom message to users when they edit the block on the back end.
- `$post_id`: the current post ID.

```php
// Specify a custom PHP callback to display the block.
'render_callback' => 'my_hero_callback',
```

```php
function my_hero_callback( $attributes, $is_preview = false, $post_id = null ) {
	// Fields data.
	if ( empty( $attributes['data'] ) ) {
		return;
	}

	// Unique HTML ID if available.
	$id = 'hero-' . ( $attributes['id'] ?? '' );
	if ( ! empty( $attributes['anchor'] ) ) {
		$id = $attributes['anchor'];
	}

	// Custom CSS class name.
	$class = 'hero ' . ( $attributes['className'] ?? '' );
	if ( ! empty( $attributes['align'] ) ) {
		$class .= " align{$attributes['align']}";
	}
	?>
	<div id="<?= $id ?>" class="<?= $class ?>" style="background-color: <?= mb_get_block_field( 'background_color' ) ?>">
		<?php $image = mb_get_block_field( 'image' ); ?>
		<img class="hero__image" src="<?= $image['full_url'] ?>">

		<div class="hero__body">
			<h2><?php mb_the_block_field( 'title' ) ?></h2>
			<h3><?php mb_the_block_field( 'subtitle' ) ?></h3>
			<div class="hero__line"></div>
			<div class="hero__content"><?php mb_the_block_field( 'content' ) ?></div>

			<?php $signature = mb_get_block_field( 'signature' ); ?>
			<img class="hero__signature" src="<?= $signature['full_url'] ?>">

			<?php if ( mb_get_block_field( 'button_url' ) ) : ?>
				<p><a class="hero__button" href="<?php mb_the_block_field( 'button_url' ) ?>"><?php mb_the_block_field( 'button_text' ) ?></a></p>
			<?php endif ?>
		</div>
	</div>
	<?php
}
```

When using the callback, you can access to the block fields data via `$attribute['data'][$field_id]`. However, to make it's convenient for you, we have created 2 helper functions: `mb_get_block_field()` and `mb_the_block_field()`.

These functions work exactly like the `rwmb_get_value()` and `rwmb_the_value()`, but applied for the current block only. The first function returns the data stored for a block field, while the 2nd one outputs that data.

```php
// Get block image field.
$image = mb_get_block_field( 'image' );
echo $image['full_url'];

// Output the block content field.
mb_the_block_field( 'content' );
```

### `render_template`

Sometimes you might want to separate the code that output a custom Gutenberg block into a template part, then you can use `render_template` parameter to specify the full path to that template part.

```php
'render_template' => get_template_directory() . '/blocks/hero/template.php',
```

Inside the template file, you have full access to the 3 parameters, just like `render_callback`:

- `$attributes`: the block attributes, which has all the block settings and fields data.
- `$is_preview`: a boolean variable to let you know if you're in the preview mode for Gutenberg or on the front end. It's useful when you want to display a custom message to users when they edit the block on the back end.
- `$post_id`: the current post ID.

You also can use the new helper functions `mb_get_block_field()` and `mb_the_block_field()` to access the block fields data easier.

So, inside the `blocks/hero/template.php`, you can write:

```php
// Fields data.
if ( empty( $attributes['data'] ) ) {
	return;
}

// Unique HTML ID if available.
$id = 'hero-' . ( $attributes['id'] ?? '' );
if ( ! empty( $attributes['anchor'] ) ) {
	$id = $attributes['anchor'];
}

// Custom CSS class name.
$class = 'hero ' . ( $attributes['className'] ?? '' );
if ( ! empty( $attributes['align'] ) ) {
	$class .= " align{$attributes['align']}";
}
?>
<div id="<?= $id ?>" class="<?= $class ?>" style="background-color: <?= mb_get_block_field( 'background_color' ) ?>">
	<?php $image = mb_get_block_field( 'image' ); ?>
	<img class="hero__image" src="<?= $image['full_url'] ?>">

	<div class="hero__body">
		<h2><?php mb_the_block_field( 'title' ) ?></h2>
		<h3><?php mb_the_block_field( 'subtitle' ) ?></h3>
		<div class="hero__line"></div>
		<div class="hero__content"><?php mb_the_block_field( 'content' ) ?></div>

		<?php $signature = mb_get_block_field( 'signature' ); ?>
		<img class="hero__signature" src="<?= $signature['full_url'] ?>">

		<?php if ( mb_get_block_field( 'button_url' ) ) : ?>
			<p><a class="hero__button" href="<?php mb_the_block_field( 'button_url' ) ?>"><?php mb_the_block_field( 'button_text' ) ?></a></p>
		<?php endif ?>
	</div>
</div>
```

### `enqueue_style`

If you want to specify a custom styling for this specific block, then set this parameter the URL to the custom CSS file that will be used to style the block.

```php
'enqueue_style'   => get_template_directory_uri() . '/blocks/hero/style.css',
```

If you have multiple blocks, then using multiple CSS files might hurt the performance of your website since you have many CSS files enqueued. In that case, please put the styles in your theme, and use the functions [enqueue_block_assets()](https://developer.wordpress.org/reference/hooks/enqueue_block_assets/) and [enqueue_block_editor_assets()](https://developer.wordpress.org/reference/hooks/enqueue_block_editor_assets/) to enqueue your styles.

### `enqueue_script`

If your block requires custom JavaScript actions, then set this parameter the URL to the custom JavaScript file that will be used to do JavaScript tasks for the block (like initialize a slider).

```php
'enqueue_script'   => get_template_directory_uri() . '/blocks/hero/script.js',
```

Please note that this script should be run in 2 cases:

- When the block is done loading on the front end
- When the block preview is done loading in the block editor on the back end

On the back end, everytime you modify the block settings, the block preview is re-rendered. The whole HTML of the block preview will be replaced by the new HTML.

So, to trigger a custom code when the block preview is loaded, you need to add an event listener to the event `mb_blocks_preview/{$block_id}` and run your code there:

```js
// Run when a block preview is done loading.
$( document ).on( 'mb_blocks_preview/hero-area', function( e ) {
	console.log( e.target ); // e.target is the wrapper div of the block.
	// Do something.
} );
```

To make it works for both front end and back end, you can write your JavaScript like this:

```js
( function( $ ) {
    function init() {
        // Do something.
    }

    // Run when a document ready on the front end.
    $( document ).ready( init );

    // Run when a block preview is done loading.
    $( document ).on( 'mb_blocks_preview/hero-area', init );
} )( jQuery );
```

Note that jQuery is already added as a dependency for the script, so you can use it in your script.

### `enqueue_assets`

If your block has some CSS / JavaScript dependencies (such as a JavaScript library), then using `enqueue_style` and `enqueue_script` might not be a good option since it allows you to enqueue only one single CSS / JS file.

In that case, use `enqueue_assets` to enqueue your assets. This parameter accept a PHP callback function, like this:

```php
'enqueue_assets' => function() {
	wp_enqueue_style( 'slick', '//cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css', [], '1.8.1' );
	wp_enqueue_script( 'slick', '//cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js', ['jquery'], '1.8.1', true );
	wp_enqueue_script( 'my-custom-script', get_template_directory_uri() . '/blocks/hero/script.js', ['slick'], '', true );
}
```

### `preview`

This attribute allows you to set preview data for the block, which will show when you click on the plus icon (+) on the toolbar:

![block preview](https://i.imgur.com/bwMPY4t.png)

The block preview is just the block rendered with a sample data. And you'll just need to set the parameter `preview` as an array of that sample data.

For example, if you have a "Team Member" block (as above) which has 3 fields: image, title and description, you can set the `preview` parameter as follows:

```php
'preview' => [
	'image'       => 'http://domain.com/person.jpg', // Image ID
	'title'       => 'William Shakespeare',
	'description' => 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam',
]
```

### `storage_type`

Sets the storage for the block fields. Default, it's `attributes`, which means saving block fields in the attributes.

If you want to save the block fields into custom fields, set it to `post_meta`. Saving block fields in the custom fields make the block acts like a wrapper of custom fields. In this case, to prevent bugs, you *should* set `multiple` to `false` to prevent inserting the same block multiple times (see `supports` parameter above).

If you want to save the block fields into custom tables, you need to activate the [MB Custom Table](https://metabox.io/plugins/mb-custom-table/) extension first. Then set `storage_type` and `table` as follows:

```php
'storage_type' => 'custom_table',
'table' => 'your table name',
```

See [MB Custom Table documentation](/extensions/mb-custom-table/) for more details.

## Adding fields to blocks

Each block can have unlimited fields. Adding fields to blocks is similar to adding fields to a custom meta box. All you need to do is specify the fields in the parameter `fields` from the block settings.

```php
add_filter( 'rwmb_meta_boxes', function( $meta_boxes ) {
	$meta_boxes[] = [
		// Other block settings.

		// Block fields.
		'fields'          => [
			[
				'type' => 'single_image',
				'id'   => 'image',
				'name' => 'Image',
			],
			[
				'type' => 'text',
				'id'   => 'title',
				'name' => 'Title',
			],
			// Other fields,
		],
	];
	return $meta_boxes;
} );
```

Each field is an array of its settings. See [this guide](https://docs.metabox.io/field-settings/) for details about field settings.

## Nested blocks (InnerBlocks)

WordPress has an amazing feature for Gutenberg blocks called [InnerBlocks](https://developer.wordpress.org/block-editor/how-to-guides/block-tutorial/nested-blocks-inner-blocks/), which allows you to insert other blocks inside a block. Since version 1.4, MB Blocks also supports this feature.

Assuming you want to create a custom testimonial block, which has the following data:

- An image
- A title
- A paragraph for the testimonial content
- And a select field for the testimonial style (something like image on the right or above the content)

It's easy to make those fields with MB Blocks. However, it might be less flexible than using default Gutenberg heading and paragraph blocks for the title and content field. So, we might want to wrap those 2 fields into a `InnerBlocks` like this:

- Image
- InnerBlocks
- Style

This is an example code of the block:

```php
add_filter( 'rwmb_meta_boxes', function( $meta_boxes ) {
	$meta_boxes[] = [
		'title'           => 'Testimonial',
		'id'              => 'testimonial',
		'type'            => 'block',
		'context'         => 'side',
		'render_callback' => function( $attributes, $preview, $post_id ) {
			?>
			<div class="testimonial testimonial--<?= mb_get_block_field( 'style' ) ?>">
				<div class="testimonial__text">
					<InnerBlocks />
				</div>
				<div class="testimonial__image">
					<?php mb_the_block_field( 'image' ) ?>
				</div>
			</div>
			<?php
		},
		'fields'          => [
			[
				'type' => 'select',
				'id'   => 'style',
				'name' => 'Style',
				'options' => [
					'default'     => 'Default',
					'image_above' => 'Image above',
				],
			],
			[
				'type' => 'single_image',
				'id'   => 'image',
				'name' => 'Image',
			],
		],
	];
	return $meta_boxes;
} );
```

When inserting a field in the admin, you'll see the block like this:

![inner blocks](https://i.imgur.com/p42aGbT.png)

As you can see the InnerBlocks on the left, where the usual placeholder is displayed "Type / to choose a block". And you can insert heading (of any type H1, H2, H3, etc.) and the content very easily.

![inner blocks in action](https://i.imgur.com/GckMMnA.png)

### Note: 

I use [Wayfinder](https://wordpress.org/plugins/wayfinder/) plugin to show the block outline, which makes us easier to see which blocks are being edited.

`<InnerBlocks />` must be wrapped in a `<div>` tag to avoid breaking the DOM nodes in the Block Editor. Get more details [here](https://github.com/WordPress/gutenberg/blob/ab1380cd41d261c91d45a0299dc4af527219e089/packages/block-editor/src/components/inner-blocks/README.md).

```html
<div class="my-inner-blocks">
	<InnerBlocks />
</div>
```

To make it more powerful, MB Blocks supports the following properties of InnerBlocks. They're exactly the same as in the [block handbook](https://developer.wordpress.org/block-editor/how-to-guides/block-tutorial/nested-blocks-inner-blocks/).

### `allowedBlocks`

`allowedBlocks` helps you to restrict blocks that are available to insert into the InnerBlocks. The blocks that are not specified, will be not available to be inserted.

In your template (or render callback), you can set `allowedBlocks` like this:

```php
<InnerBlocks
	allowedBlocks="<?= esc_attr( json_encode( [
		'core/heading',
		'core/paragraph',
	] ) ) ?>"
/>
```

This allows you to insert only heading and paragraph blocks.

### `orientation`

By default, InnerBlocks expects its blocks to be shown in a vertical list. A valid use-case is to style InnerBlocks to appear horizontally. When blocks are styled in such a way, the orientation prop can be used to indicate a horizontal layout:

```php
<InnerBlocks orientation="horizontal" />
```

### `template`

Use the template property to define a set of blocks that prefill the InnerBlocks component when inserted. You can set attributes on the blocks to define their use. The example below shows a book review template using InnerBlocks component and setting placeholders values to show the block usage.

```php
<InnerBlocks
	template="<?= esc_attr( json_encode( [
		[ 'core/heading',   [ 'placeholder' => 'Enter testimonial title...' ] ],
		[ 'core/paragraph', [ 'placeholder' => 'Enter testimonial content...' ] ],
	] ) ) ?>"
/>
```

### `templateLock`

Template locking allows locking the InnerBlocks area for the current template. Options:

- 'all' — prevents all operations. It is not possible to insert new blocks. Move existing blocks or delete them.
- 'insert' — prevents inserting or removing blocks, but allows moving existing ones.
- false — prevents locking from being applied to an InnerBlocks area even if a parent block contains locking. ( Boolean )

If locking is not set in an InnerBlocks area: the locking of the parent InnerBlocks area is used.

If the block is a top level block: the locking of the Custom Post Type is used.

### Example

This is a more complete example of the testimonial block with more properties (here I insert inline style into the block for the demo purpose, you should separate it into a CSS file using the `enqueue_style` parameter):

```php
<?php
add_filter( 'rwmb_meta_boxes', function( $meta_boxes ) {
	$meta_boxes[] = [
		'title'           => 'Testimonial',
		'id'              => 'testimonial',
		'type'            => 'block',
		'context'         => 'side',
		'render_callback' => function( $attributes, $preview, $post_id ) {
			?>
			<div class="testimonial testimonial--<?= mb_get_block_field( 'style' ) ?>">
				<div class="testimonial__text">
					<InnerBlocks
						allowedBlocks="<?= esc_attr( json_encode( [
							'core/heading',
							'core/paragraph',
						] ) ) ?>"
						orientation="vertical"
						template="<?= esc_attr( json_encode( [
							[ 'core/heading',   [ 'placeholder' => 'Enter testimonial title...' ] ],
							[ 'core/paragraph', [ 'placeholder' => 'Enter testimonial content...' ] ],
						] ) ) ?>"
						templateLock="insert"
					/>
				</div>
				<div class="testimonial__image">
					<?php mb_the_block_field( 'image' ) ?>
				</div>
			</div>
			<style>
				.testimonial {
					padding: 16px;
					display: flex;
					justify-content: space-between;
					align-items: flex-start;
				}
				.testimonial__text {
					flex: 1;
					margin-right: 12px;
				}
				.testimonial--image_above {
					flex-direction: column-reverse;
					text-align: center;
					align-items: stretch;
				}
				.testimonial--image_above .testimonial__text {
					margin-right: 0;
					margin-top: 12px;
				}
			</style>
			<?php
		},
		'fields'          => [
			[
				'type' => 'select',
				'id'   => 'style',
				'name' => 'Style',
				'options' => [
					'default'     => 'Default',
					'image_above' => 'Image above',
				],
			],
			[
				'type' => 'single_image',
				'id'   => 'image',
				'name' => 'Image',
			],
		],
	];
	return $meta_boxes;
} );
```

## Block templates

Sometimes you want to load default blocks when creating a new post. Block templates allow to specify a default initial state for an editor session. Use the argument `template` when [registering the post type](https://developer.wordpress.org/reference/functions/register_post_type):

`'template'              => [
    ['meta-box/{$block_id}']
]`

## Block Data

Unlike normal custom fields, Gutenberg blocks don't save value in the post meta (or [custom table](https://metabox.io/plugins/mb-custom-table/)). Each block created using MB Blocks is a *dynamic Gutenberg block*. And the block data is saved as a JSON string in the block content.

If you view the post content via a tool like PHPMyAdmin, you'll see the block is stored as a string like this:

```html
<!-- wp:meta-box/hero-content {"id":"block_jyqlhbauqz4jz51ahab","data":{"image":"10","title":"Hi, I’m Martin Green","subtitle":"WEB DEVELOPER \u0026 DESIGNER","content":"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusa ntium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta suntlo explica bo. Nemo enim ipsam voluptatem quia voluptas.","signature":"9","button_text":"Discover More","button_url":"#","background_color":"#f5f7f8"},"align":"wide"} /-->
```

When you decode the JSON string, you'll see the block data as an object like this:

```json
{
  "id": "block_jyqlhbauqz4jz51ahab",
  "data": {
    "image": "10",
    "title": "Hi, I’m Martin Green",
    "subtitle": "WEB DEVELOPER \u0026 DESIGNER",
    "content": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusa ntium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta suntlo explica bo. Nemo enim ipsam voluptatem quia voluptas.",
    "signature": "9",
    "button_text": "Discover More",
    "button_url": "#",
    "background_color": "#f5f7f8"
  },
  "align": "wide"
}
```

It has the following attribute:

- `name`: the block name
- `id`: an unique ID for the block. Note that it's different from the block settings ID. This ID can be used to set the `id` parameter in the HTML if you want.
- `align`: block alignment
- `anchor`: block anchor
- `className`: custom CSS class for the block
- `data`: an array of the block fields data, in format of `'field_id' => 'field_value'`

The data is passed to the `render_callback` or `render_template` as `$attributes` parameter. So you can use it to render the block.

Note that: although you can access to the fields values via `$attributes['data]'`, it's recommended to use the `mb_get_block_field()` and `mb_the_block_field()` functions.

## Video Tutorial

**Create Custom Gutenberg Blocks With Meta Box (only PHP)**

<iframe width="560" height="315" src="https://www.youtube.com/embed/PAisKy8eC2U" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

**Build Gutenberg Blocks Visually With Meta Box Builder**

<iframe width="560" height="315" src="https://www.youtube.com/embed/v3ke1DBlWuk" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

See more details on [using Meta Box Builder with MB Blocks](https://metabox.io/build-gutenberg-blocks-visually-with-meta-box-builder/).

## Example

The complete code example for the video (and used to write this tutorial) is [available in the Library](https://github.com/wpmetabox/library/tree/master/extensions/mb-blocks/hero). You can copy the code and put it in your theme. Then start to modify it to create your own Gutenberg blocks.
