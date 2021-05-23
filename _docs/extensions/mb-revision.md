---
title: MB Revision
---

MB Revision adds support for custom fields in WordPress revision that helps you to track changes of custom fields.

## Enabling revision support

First of all, please make sure that you didn't turn off revision in WordPress. To check this, please open your `wp-config.php` and see if this line presents:

```php
define( 'WP_POST_REVISIONS', false );
```

If you can't find it, that means revision is turned on, which is great!

To enable revision support for a meta box, add a new setting to the meta box as follows:

```php
'revision' => true,
```

Now whenever you update a post, WordPress will create a revision for it. And MB Revision ensures all the values of the custom fields are copied from the parent post to that revision.

## Comparing the changes

When you update a post, WordPress automatically creates a revision for that post. You can see the list of revisions in the **Revisions** meta box below the main editor:

![revision list](https://i.imgur.com/rThtMe0.png)

Also, in the **Publish** meta box, you'll see a link to browse all revisions:

![browse revision](https://i.imgur.com/RqXRfhG.png)

Clicking either on any revision in the list or on *Browse* link brings you to the revision comparison screen. There you'll see something like this:

![revision compare](https://i.imgur.com/oObKhaE.png)

Except title and content, which are post fields, other items on this screen are custom fields created by Meta Box. There you'll see highlighted lines or words, which are added or removed by users.

If the custom field has simple value (like a string), it will display fully here. If the custom field has structural value (array), it will display here as a JSON-encoded string. Using JSON allows you to see the values of each element in the array as well as the structure in general.

Please note that the extension works well with [Meta Box Group](https://metabox.io/plugins/meta-box-group/) extension.

## Restoring the revision

If you find out that the current version of the post is incorrect, you can compare it with the previous version and optionally restore it. In order to restore a revision, simply click on the **Restore this revision** button on the comparison screen.

MB Revision will copy values of the custom fields from the revision to the parent post. So your post will have the correct values of custom fields like it used to be.

## Notes

Because WordPress supports revision for posts and custom post types only, the extension doesn't work for [term meta](https://metabox.io/plugins/mb-term-meta/), [user meta](https://metabox.io/plugins/mb-user-meta/) or [settings pages](https://metabox.io/plugins/mb-settings-page/).

Please make sure you either not define `WP_POST_REVISIONS` or set it to a proper value in `wp-config.php`. This constant disables or limits the number of revisions. Therefore, it might cause unexprected result. Please see [WordPress Codex](https://codex.wordpress.org/Revisions#Revision_Options) for more information.
