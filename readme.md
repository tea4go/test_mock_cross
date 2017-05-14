## test_mock_cross

### 说明

本程序主要验证：
1. mock.js的使用。
2. cross跨域的调用。
3. Vue简单使用。

### cross后端代码
```go
// @Title TestCross
// @Description cross跨域的调用
// @Success 200
// @Failure 403
// @router /test_cross [get]
func (c *TWifidogController) TestCross() {
	beego.BeeLogger.Debug("\n\n\n===> TWifidogController::TestCross() : " + c.Ctx.Input.URI())
	defer beego.BeeLogger.Debug("===> TWifidogController::TestCross() End.")
	ps := c.Input()
	for k, v := range ps {
		beego.BeeLogger.Debug("  [%s] = %s", k, v)
	}
	result_data := fmt.Sprintf("cross_callback_func(%s)", c.GetString("out_data"))
	beego.BeeLogger.Debug(result_data)
	c.Ctx.WriteString(result_data)
}
```

