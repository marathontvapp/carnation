# Carnation

Carnation is an accessible framework for building universal React design systems.

For more information, visit our [docs](https://carnation.vercel.app).

## Design Systems

A design system is a hierarchy of styles, components, and patterns that can be used by designers and engineers to build any number of applications. At the core of any digital experience is a design system: it's in the text, in the buttons, it's _everywhere_.

Check out our [Design Systems](https://carnation.vercel.app/docs/background/design-systems) doc for more in-depth information and examples.

## Philosophy

Design systems are scalable and their implementations should be too. Managing multiple codebases that implement the same design system can get tedious, especially for smaller teams or solo engineers. What if you could design once, code once, and have it appear everywhere? **That is the promise of Carnation.**

Check out our [Motivation](https://carnation.vercel.app/docs/background/motivation) doc for more in-depth information on how we landed on our approach.

### Web-first

Unlike other universal design system frameworks, Carnation is web-first. No more writing `View` or `Text` components; you'll be writing real DOM elements:

```tsx
<c.article>
  <c.h1>Carnation Is Changing the Design Space</c.h1>
  <c.p>
    By <c.a href="/authors/josh">Josh Pensky</c.a>
  </c.p>
  <c.img src="..." alt="A sunrise over a snowy mountain." />
</c.article>
```

Check out the [Primitives](https://carnation.vercel.app/docs/primitives) section for more about our core components.

### Tailwind-first

Carnation leverages the power of [Tailwind CSS](https://tailwindcss.com/) to make defining the styles of your universal design system easy. On native, Tailwind classes are compiled at build time to native `StyleSheet`s via [NativeWind](https://www.nativewind.dev/).

```tsx
<c.p className="font-sans text-black dark:text-white">
  Lorem ipsum dolor sit amet.
</c.p>
```

### Motion-first

Carnation brings a universal API for motion to design systems, brought to you by [Framer Motion](https://www.framer.com/motion/) on web and [Reanimated](https://docs.swmansion.com/react-native-reanimated/) on native.

```tsx
<m.div
  ariaLabel="Loading..."
  initial={{ rotate: 0 }}
  animate={{ rotate: 360 }}
  transition={{ type: "timing", ease: "linear", repeat: Infinity }}
>
  <LoadingIcon />
</m.div>
```

### Accessibility-first

Beyond exposing semantic components and ARIA props, we also take inspiration from [Radix UI](https://www.radix-ui.com/) to export composable components that implement accessible patterns not built into the web and/or native.

```tsx
<Tabs.Root>
  <Tabs.List ariaLabel="Feeds">
    <Tabs.Trigger value="following">Following</Tabs.Trigger>
    <Tabs.Trigger value="explore">Explore</Tabs.Trigger>
  </Tabs.List>
  <Tabs.Content value="following">...</Tabs.Content>
  <Tabs.Content value="explore">...</Tabs.Content>
</Tabs.Root>
```
