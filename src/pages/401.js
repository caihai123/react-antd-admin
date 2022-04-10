import { Result, Button } from "antd";
import { useNavigate } from "react-router-dom";

export default function Page() {
  let navigate = useNavigate();
  return (
    <Result
      status="403"
      title="401"
      subTitle="对不起，您没有访问本页的权限。"
      extra={
        <Button type="primary" onClick={() => navigate("/")}>
          回到首页
        </Button>
      }
    />
  );
}
