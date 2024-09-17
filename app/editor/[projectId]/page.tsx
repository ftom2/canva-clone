import { protectServer } from "@/app/(auth)/utils";
import Editor from "@/app/editor/components/Editor";

type Props = {};
export default async function EditorProjectIdPage({}: Props) {
  await protectServer();
  return <Editor />;
}
