import app from "@/app";
import { PORT } from "@/setting";

app.listen(PORT, () => {
  console.log(`server is running at <http:localhost:${PORT}>`);
});
