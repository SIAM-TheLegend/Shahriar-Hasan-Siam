/**
 * Smoothly scrolls to a specific section by ID
 * @param sectionId The ID of the section to scroll to
 * @param offset Offset from the top (in pixels)
 */
export function scrollToSection(sectionId: string, offset = 80) {
  const element = document.getElementById(sectionId);

  if (!element) return;

  const elementPosition = element.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.scrollY - offset;

  window.scrollTo({
    top: offsetPosition,
    behavior: "smooth",
  });
}
