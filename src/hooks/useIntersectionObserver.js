import { useState, useCallback } from 'react'

export const useIntersectionObserver = ({
  root = null,
  rootMargin = '0px',
  threshold = 0
} = {}) => {
  const [observer, setOserver] = useState()
  const [isInView, setIsInView] = useState(false)

  const loadMoreRef = useCallback(
    (node) => {
      if (node) {
        const observer = new IntersectionObserver(
          ([entry]) => {
            setIsInView(entry.isIntersecting)
          },
          { root, rootMargin, threshold }
        )

        observer.observe(node)
        setOserver(observer)
      }
    },
    [root, rootMargin, threshold]
  )

  return { loadMoreRef, isInView, observer }
}
