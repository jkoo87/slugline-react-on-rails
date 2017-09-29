require 'test_helper'

class SluglinesControllerTest < ActionDispatch::IntegrationTest
  test "should get home" do
    get sluglines_home_url
    assert_response :success
  end

  test "should get show" do
    get sluglines_show_url
    assert_response :success
  end

end
