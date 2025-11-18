import {SettingsLayout} from "../../../core/src/components/settings/SettingsLayout";
import {AccountSettings} from "../../../core/src/components/settings/AccountSettings";
import {NotificationSettings} from "../../../core/src/components/settings/NotificationSettings";
import {PrivacySettings} from "../../../core/src/components/settings/PrivacySettings";
import {PreferenceSettings} from "../../../core/src/components/settings/PreferenceSettings";


export function Settings() {
  return (
    <SettingsLayout>
      <div className="space-y-10">
        <AccountSettings />
        <NotificationSettings />
        <PrivacySettings />
        <PreferenceSettings />
      </div>
    </SettingsLayout>
  );
}