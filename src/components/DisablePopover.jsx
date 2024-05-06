import { Popover } from "antd"

const DisabledPopover = ({ children }) => {
  const content = <div className="text-[#fff]">Please login to continue</div>
  return (
    <Popover content={content} title="" color="#ff6868" trigger="hover" className="login-popover">
      {children}
    </Popover>
  )
}

export default DisabledPopover;