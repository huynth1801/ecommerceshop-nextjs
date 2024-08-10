import { auth } from "@clerk/nextjs/server"

interface SettingsPageProps {
  params: {
    storeId: string
  }
}

const SettingsPage: React.FC<SettingsPageProps> = ({ params }) => {
  const { userId } = auth()
  return <div>Hello Settings</div>
}

export default SettingsPage
