import type { Config } from 'tailwindcss';

export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{html,ts,md,analog,ag}'],
  presets: [require('@spartan-ng/ui-core/hlm-tailwind-preset')],
  plugins: [
    require('@tailwindcss/typography'),
  ],
  theme: {
    extend: {},
  },
} satisfies Config;
