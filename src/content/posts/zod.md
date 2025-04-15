---
title: zod
published: 2024-04-13
description: ''
image: ''
tags: [typescript, validation]
category: 'frontEnd'
draft: false
lang: ''
---

اعتبارسنجی با Zod و TypeScript

**Zod** یک کتابخانه‌ی اعتبارسنجی اسکیما (schema validation) برای TypeScript است که به صورت کامل با سیستم نوع‌گذاری آن یکپارچه شده است. بر خلاف سایر کتابخانه‌ها مانند Joi یا Yup، که ابتدا برای JavaScript طراحی شده‌اند و بعداً قابلیت‌هایی برای TypeScript به آن‌ها اضافه شده، Zod از ابتدا با هدف پشتیبانی بومی از TypeScript ساخته شده است.
TypeScript با وجود سیستم نوع‌گذاری قدرتمند خود، فقط در زمان کامپایل کار می‌کند و هیچ گونه بررسی‌ای در زمان اجرای برنامه انجام نمی‌دهد. اینجاست که کتابخانه‌هایی مانند **Zod** وارد می‌شوند تا این شکاف را پر کنند.

### شروع کار با Zod

ابتدا باید Zod را در پروژه خود نصب کنید:

    npm install zod
    یا
    yarn add zod
    یا
    pnpm add zod

##

سپس می‌توانید به شکل زیر از آن استفاده کنید:

    import { z } from 'zod';

    const postSchema = z.object({
      title: z.string().min(5).max(100),
      slug: z.string().regex(/^[a-z0-9-]+$/),
      content: z.string().min(20),
      tags: z.array(z.string()).optional(),
      published: z.boolean().default(false),
      createdAt: z.date().default(() => new Date()),
    });

    // استنتاج نوع TypeScript از طرحواره
    type Post = z.infer<typeof postSchema>;

    // اکنون 'Post' به طور خودکار به این صورت تایپ می‌شود:
     {
       title: string;
       slug: string;
       content: string;
       tags?: string[] | undefined;
       published: boolean;
       createdAt: Date;
     }

در این مثال:

- `z.object({})` یک طرحواره برای یک شیء ایجاد می‌کند.
- `z.string()` یک نوع رشته‌ای را تعریف می‌کند. می‌توانید متدهایی مانند `.min()` و `.max()` را برای اعتبارسنجی بیشتر زنجیر کنید.
- `z.regex()` به شما امکان می‌دهد در برابر عبارات منظم اعتبارسنجی کنید.
- `z.array(z.string())` یک آرایه از رشته‌ها را تعریف می‌کند.
- `z.boolean()` یک نوع بولی را تعریف می‌کند.
- `.optional()` یک فیلد را اختیاری می‌کند.
- `.default()` اگر فیلد از دست رفته باشد، یک مقدار پیش‌فرض ارائه می‌دهد.
- `z.date()` یک نوع تاریخ را تعریف می‌کند.

از متدهای `parse()` یا `safeParse()` آن برای اعتبارسنجی داده‌ها استفاده کنید

    const validPostData = {
      title: 'پست وبلاگ عالی من',
      slug: 'post-veblage-ali-man',
      content: 'این محتوای پست وبلاگ شگفت‌انگیز من است.',
      tags: ['typescript', 'zod'],
    };

    try {
      const parsedData = postSchema.parse(validPostData);
      console.log('اعتبارسنجی موفقیت‌آمیز بود!', parsedData);
      // اکنون تضمین می‌شود که parsedData از نوع 'Post' است
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.error('اعتبارسنجی ناموفق بود:', error.issues);
        // مدیریت خطاهای اعتبارسنجی، به عنوان مثال، نمایش آنها به کاربر
      } else {
        console.error('یک خطای غیرمنتظره رخ داد:', error);
      }
    }

    const invalidPostData = {
      title: 'خیلی کوتاه',
      slug: 'کاراکتر نامعتبر!',
      content: 'کوتاه',
    };

    const safeResult = postSchema.safeParse(invalidPostData);

    if (safeResult.success) {
      console.log('اعتبارسنجی موفقیت‌آمیز بود (safeParse)!', safeResult.data);
    } else {
      console.error('اعتبارسنجی ناموفق بود (safeParse):', safeResult.error.issues);
      // مدیریت ظریف خطاهای اعتبارسنجی
    }

- `parse()` اگر اعتبارسنجی ناموفق باشد، یک `ZodError` پرتاب می‌کند. این روش زمانی مفید است که انتظار دارید داده‌ها معتبر باشند و می‌خواهید خطاها را با یک بلوک `try...catch` مدیریت کنید.
- `safeParse()` یک شیء با یک ویژگی بولی `success` و یا یک ویژگی `data` (اگر معتبر باشد) یا یک ویژگی `error` (اگر نامعتبر باشد) برمی‌گرداند. این روش اغلب برای مدیریت خطای کنترل‌شده‌تر ترجیح داده می‌شود.

## ترکیب اسکیمای تودرتو (Nested Schemas)

    const addressSchema = z.object({
      city: z.string(),
      zip: z.string().length(10),
    });

    const personSchema = z.object({
      name: z.string(),
      address: addressSchema,
    });

### مزایای استفاده از Zod با TypeScript

- **ایمنی نوع سرتاسری:** Zod شکاف بین بررسی نوع در زمان کامپایل TypeScript و اعتبارسنجی داده در زمان اجرا را پر می‌کند و ایمنی نوع را در سراسر برنامه شما تضمین می‌کند.
- **کاهش کد تکراری:** استنتاج طرحواره Zod نیاز به تعریف دستی انواع TypeScript که منطق اعتبارسنجی شما را منعکس می‌کنند، از بین می‌برد.
- **بهبود یکپارچگی داده‌ها:** اعتبارسنجی قوی در زمان اجرا از خطاهای غیرمنتظره جلوگیری می‌کند و اطمینان می‌دهد که برنامه شما داده‌ها را به درستی مدیریت می‌کند.
- **نحو واضح و مختصر:** API روان Zod تعریف و درک قوانین اعتبارسنجی شما را آسان می‌کند.
- **تجربه توسعه‌دهنده:** شناسایی زودهنگام مشکلات مربوط به داده در فرآیند توسعه منجر به یک پایگاه کد پایدارتر و قابل نگهداری‌تر می‌شود.
