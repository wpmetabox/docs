---
title: Composer
---

This documentation will show you how to install [Meta Box extensions](https://metabox.io/plugins) via Composer.

If you haven't known about [Composer](https://getcomposer.org), then it is a package dependency manager for PHP. The core [*Meta Box*](https://metabox.io) plugin [already supports Composer](/composer/). And so does its extension.

## Setup

To use Composer to install Meta Box extensions, please add `repositories` rule to your `composer.json`:

```json
"repositories": [{
  "type": "composer",
  "url": "https://packages.metabox.io/YOUR_API_KEY"
}],
```

Please note that **you need an active API Key** to use Meta Box extensions with Composer. Go to [My Account](https://metabox.io/my-account/) page to get your API Key.

If your license has expired, please renew it. If you don't have any, then you need to purchase [an extension](https://metabox.io/plugins/) or [a bundle of extensions](https://metabox.io/pricing/).

The system automatically checks if your license is still active. If yes, then you'll granted access via Composer to Meta Box's packages. It also ensures you have access to only extensions you purchased.

## Using 

To include extensions via Composer, simply add them as dependencies like this:

```json
"require": {
  "meta-box/meta-box-group": "dev-master",
  "meta-box/meta-box-columns": "dev-master",
  "meta-box/mb-settings-page": "dev-master",
}
```

So, your final `composer.json` will look like this:

```json
{
  "repositories": [{
    "type": "composer",
    "url": "https://packages.metabox.io/YOUR_API_KEY"
  }],
  "require": {
    "meta-box/meta-box-group": "dev-master",
    "meta-box/meta-box-columns": "dev-master",
    "meta-box/mb-settings-page": "dev-master",
  }
}
```

*Important note:* the version of extensions specified in `composer.json` *must* be `dev-master`. We don't support version constrains for Meta Box extensions yet. This makes you always use the latest version available.

To install the extensions, simply run:

```bash
composer install
```

Alternatively, you can install the extensions via command line without editing `composer.json`:

```bash
composer require meta-box/meta-box-group:dev-master
```

## Autoloading

To make the extensions work, simply load Composer's autoload file, like this:

```php
require 'vendor/autoload.php';
```

Now Meta Box extensions are available in your plugin and you can start using it!
