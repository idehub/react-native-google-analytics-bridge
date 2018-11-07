require "json"

package = JSON.parse(File.read(File.join(__dir__, "package.json")))
ios_root = 'ios/RCTGoogleAnalyticsBridge'
galib_root = ios_root+'/google-analytics-lib'

Pod::Spec.new do |s|
  s.name         = "react-native-google-analytics-bridge"
  s.version      = package["version"]
  s.summary      = package["description"]
  s.author       = "Idéhub AS"

  s.homepage     = package["homepage"]

  s.license      = package["license"]
  s.platform     = :ios, "7.0"

  s.source       = { :git => "https://github.com/idehub/react-native-google-analytics-bridge", :tag => "v#{s.version}" }
  s.default_subspec = 'Core'

  s.subspec 'Core' do |ss|
    ss.dependency 'React'
    ss.frameworks = 'CoreData', 'SystemConfiguration'
    ss.libraries = 'z', 'sqlite3.0','GoogleAnalyticsServices'

    ss.vendored_libraries =
      galib_root+'/libGoogleAnalyticsServices.a'

    ss.source_files  =
      galib_root+'/*.{h}',
      ios_root+'/RCTGoogleAnalyticsBridge/*.{h,m}'
  end

  s.subspec 'adSupport' do |ss|
    ss.dependency       'react-native-google-analytics-bridge/Core'
    ss.frameworks = 'AdSupport'
    ss.libraries = 'AdIdAccess'
    ss.vendored_libraries =
      galib_root+'/libAdIdAccess.a'
  end

end
