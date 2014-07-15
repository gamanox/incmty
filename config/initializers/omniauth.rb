OmniAuth.config.logger = Rails.logger



Rails.application.config.middleware.use OmniAuth::Builder do

  provider :facebook, '261219254067038', '9e1d273a026b2322dabe832e04c719da', :scope => 'email,user_birthday,read_stream', :display => 'popup', :image_size => 'large'

end