/**
 * Azure Maid skin — browser half.
 *
 * Marks the document, forces the dark base palette, and injects the skin
 * stylesheet as a plugin-owned global style. The stylesheet carries the
 * alias-token overrides itself, so unloading the plugin retracts the whole
 * skin (palette + wallpaper) with the style element.
 */
window.__ModuleLoader__.load({
  id: 'dsh-skin-azure-maid',
  factory: (require) => {
    var module = { exports: {} }
    var exports = module.exports
    Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' })

    const MARK = 'azure'
    const STYLESHEET = __CSS__

    /**
     * Mount the skin.
     * @param ctx - client cordis context.
     */
    function apply(ctx) {
      ctx.effect(() => {
        const root = document.documentElement
        const body = document.body
        const ensure = () => {
          root.dataset.dshSkin = MARK
          body.dataset.dshSkin = MARK
          if (!body.hasAttribute('data-ds-dark-theme')) body.setAttribute('data-ds-dark-theme', '')
        }
        ensure()
        const observer = new MutationObserver(ensure)
        observer.observe(body, { attributes: true, attributeFilter: ['data-ds-dark-theme'] })
        return () => {
          observer.disconnect()
          delete root.dataset.dshSkin
          delete body.dataset.dshSkin
        }
      }, 'azure-maid: document marker')

      ctx.effect(() => {
        const tag = document.createElement('style')
        tag.dataset.plugin = 'dsh-skin-azure-maid'
        tag.dataset.pluginCss = 'dsh-skin-azure-maid/skin.css'
        tag.textContent = STYLESHEET
        document.head.appendChild(tag)
        return () => { tag.remove() }
      }, 'azure-maid: stylesheet')
    }

    exports.apply = apply
    return module.exports
  },
})