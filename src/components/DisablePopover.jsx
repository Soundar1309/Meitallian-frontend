import { Popover } from "antd"

const DisabledPopover = ({ children }) => {
  const content = <div className="text-[#fff] font-semibold">Please Login to Order Now</div>
  return (
    <Popover content={content} title="" color="#2a634e" trigger="hover" className="login-popover rounded-md">
      {children}
    </Popover>
  )
}

export default DisabledPopover;