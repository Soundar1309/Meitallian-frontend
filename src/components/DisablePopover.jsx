import { Popover } from "antd"

const DisabledPopover = ({ children }) => {
  const content = <div>Please login to continue</div>
  return (
    <Popover content={content} title="" trigger="hover" className="login-popover">
      {children}
    </Popover>
  )
}

export default DisabledPopover;