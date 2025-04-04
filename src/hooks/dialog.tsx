/* eslint-disable vue/multi-word-component-names */
import { ElDialog, ElIcon } from 'element-plus'
import ConfigProvider from '@/components/ConfigProvider.vue'
import { FullScreen, Crop } from '@element-plus/icons-vue'
export function useDialog() {
  const dialogVisible = ref(false)
  const open = ({
    dialogProps,
    compProps = {},
    comp,
    isFooter = true,
  }: {
    dialogProps: InstanceType<typeof ElDialog>['$props']
    comp: Component
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    compProps: Record<string, any>
    isFooter: boolean
  }) => {
    dialogVisible.value = true
    const div = document.createElement('div')
    document.body.appendChild(div)
    const isFullscreen = ref(dialogProps.fullscreen || false)

    const app = createApp({
      provide: {
        closeDialog: close,
      },
      render() {
        return (
          <ConfigProvider>
            <ElDialog
              fullscreen={isFullscreen.value}
              closeOnClickModal={false}
              alignCenter
              destroyOnClose
              appendToBody
              draggable
              {...dialogProps}
              modelValue={dialogVisible.value}
              onUpdate:modelValue={(val) => {
                dialogVisible.value = val
              }}
              onClosed={() => {
                app.unmount()
                div.remove()
                if (dialogProps.onClosed) dialogProps.onClosed()
              }}
            >
              {{
                header: () => (
                  <>
                    {dialogProps.title}
                    {!isFullscreen.value ? (
                      <button
                        class="el-dialog__headerbtn fullscreen"
                        onClick={() => (isFullscreen.value = !isFullscreen.value)}
                      >
                        <ElIcon>
                          <FullScreen />
                        </ElIcon>
                      </button>
                    ) : (
                      <button
                        class="el-dialog__headerbtn fullscreen"
                        onClick={() => (isFullscreen.value = !isFullscreen.value)}
                      >
                        <ElIcon>
                          <Crop />
                        </ElIcon>
                      </button>
                    )}
                  </>
                ),
                default: () =>
                  h(comp, {
                    ...compProps,
                    onCancel: () => {
                      close()
                      if (compProps.onCancel) compProps.onCancel()
                    },
                    onOk: () => {
                      close()
                      if (compProps.onOk) compProps.onOk()
                    },
                  }),
                footer: isFooter ? () => undefined : undefined,
              }}
            </ElDialog>
          </ConfigProvider>
        )
      },
    })
    app.mount(div)
  }

  const close = () => {
    dialogVisible.value = false
  }

  return {
    open,
    close,
  }
}
