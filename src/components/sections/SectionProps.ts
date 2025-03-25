/**
 * Shared interface for section component props
 * Used across all section components to ensure consistent props
 */
export interface SectionProps {
  /**
   * Whether to use transition animations when navigating to this section
   * @default false
   */
  withTransition?: boolean;

  /**
   * Whether to use parallax effect for the background during transitions
   * @default false
   */
  withParallax?: boolean;

  /**
   * Current active section ID (for triggering transitions)
   */
  activeSection?: string;

  /**
   * Animation threshold - percentage of element visible to trigger
   * @default 0.1
   */
  threshold?: number;
}
