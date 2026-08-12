const MEASUREMENT_ID = "G-VZHH30KLQX";

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

function gtag(...args: unknown[]): void {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag(...args);
}

export function trackPageView(path: string, title?: string): void {
  gtag("event", "page_view", {
    page_path: path,
    page_title: title ?? document.title,
    send_to: MEASUREMENT_ID,
  });
}

export interface ProductItem {
  item_id: string;
  item_name: string;
  price?: number;
  currency?: string;
  category?: string;
}

export function trackProductView(item: ProductItem): void {
  gtag("event", "view_item", {
    currency: item.currency ?? "USD",
    value: item.price ?? 0,
    items: [normalizeItem(item)],
  });
}

export function trackAddToCart(item: ProductItem, quantity = 1): void {
  gtag("event", "add_to_cart", {
    currency: item.currency ?? "USD",
    value: (item.price ?? 0) * quantity,
    items: [{ ...normalizeItem(item), quantity }],
  });
}

export function trackContactSubmit(formId?: string): void {
  gtag("event", "contact_submit", {
    form_id: formId ?? "newsletter",
  });
}

function normalizeItem(item: ProductItem) {
  return {
    item_id: item.item_id,
    item_name: item.item_name,
    price: item.price ?? 0,
    item_category: item.category,
  };
}

export { MEASUREMENT_ID };
