import { onCleanup, onMount } from 'solid-js'

type Props = {
  botContainer: HTMLDivElement | undefined
  poweredByTextColor?: string
  badgeBackgroundColor?: string
}

const defaultTextColor = '#303235'

export const Badge = (props: Props) => {
  let liteBadge: HTMLAnchorElement | undefined
  let observer: MutationObserver | undefined

  const appendBadgeIfNecessary = (mutations: MutationRecord[]) => {
    mutations.forEach((mutation) => {
      mutation.removedNodes.forEach((removedNode) => {
        if (
          'id' in removedNode &&
          liteBadge &&
          removedNode.id == 'lite-badge'
        ) {
          console.log("Sorry, you can't remove the brand 😅")
          props.botContainer?.append(liteBadge)
        }
      })
    })
  }

  onMount(() => {
    if (!document || !props.botContainer) return
    observer = new MutationObserver(appendBadgeIfNecessary)
    observer.observe(props.botContainer, {
      subtree: false,
      childList: true,
    })
  })

  onCleanup(() => {
    if (observer) observer.disconnect()
  })

  return (
    <span style={{
      "font-size": '13px',
      position: 'absolute',
      bottom: 0,
      padding: '10px',
      margin: 'auto',
      width: '100%',
      "text-align": 'center',
      color: props.poweredByTextColor ?? defaultTextColor,
      "background-color": props.badgeBackgroundColor ?? '#ffffff'
    }}>Powered by
      <a
        ref={liteBadge}
        href={'https://gpt.ar'}
        target="_blank"
        rel="noopener noreferrer"
        class="lite-badge"
        id="lite-badge"
        style={{ "font-weight": 'bold', color: props.poweredByTextColor ?? defaultTextColor }}
      >
         <span style={{ color: '#F8B329' }}>AI</span>
        <span style={{ color: '#FB475E' }}> TA</span>
        <span style={{ color: '#8C73FF' }}> LA</span>
        <span style={{ color: '#F8B329' }}> IA</span>
        <span style={{ color: '#37D3C1' }}> .</span>
        <span style={{ color: '#239DBF' }}> COM</span>
      </a>
    </span>
  )
}
