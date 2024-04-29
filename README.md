# Quanta AI

Welcome to Quanta AI, a SaaS application designed to streamline your content generation needs. Quanta AI utilizes cutting-edge technologies to offer features such as chat, code, image, and video generation, powered by the OpenAI API. With seamless integration of Next.js, Shadcn for UI styling, Postgrey for the database, Prisma for ORM, Clerk for authentication, Crisp for chat support, and Stripe for payment processing, Quanta AI delivers a comprehensive solution for content creators.

## Live Demo

Check out the live demo of Quanta AI [Website Link](https://quanta-ai--beta.vercel.app/).

## Usage

1. Sign up for an account using Clerk authentication.
2. Explore the various content generation features.
3. Enjoy 10 free trials during the trial period.
4. Choose a subscription plan and proceed with payment using Stripe.
5. Access premium features based on your subscription tier.

## Features

- Chat generation
- Code generation
- Image generation
- Video generation
- Secure login and signup authentication
- Trial period with 10 free trials
- Subscription-based model with four pricing tiers
- Stripe integration for payment processing

## Tech Stack

- Next.js
- Prisma
- PostgreSQL
- Stripe
- Clerk
- Crisp
- Shadcn
- TypeScript
- Zod
- TailwindCSS

## Installation

Follow these steps to set up Quanta AI locally:

1. Clone the repository:

```bash
git clone https://github.com/your-username/quanta-ai.git
```

2. Navigate to the project directory:

```bash
cd quanta-ai
```

3. Install dependencies:

```bash
npm install
```

4. Set up environment variables:

   Create a `.env` file in the root directory and add the following:

   ```plaintext
   NEXT_PUBLIC_OPENAI_API_KEY=your_openai_api_key
   NEXT_PUBLIC_STRIPE_PUBLIC_KEY=your_stripe_public_key
   STRIPE_SECRET_KEY=your_stripe_secret_key
   ```

5. Run the development server:

```bash
npm run dev
```

6. Visit `http://localhost:3000` in your browser to access Quanta AI.


## Contributing

We welcome contributions from the community! Feel free to submit bug reports, feature requests, or pull requests through GitHub.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Thank you for choosing Quanta AI! We hope you find it useful for your content generation needs. If you have any feedback or suggestions, we'd love to hear from you.
