require 'test_helper'

class ApiControllerTest < ActionDispatch::IntegrationTest
  def setup
    DeviseTokenAuth.cookie_attributes[:secure] = false
    DeviseTokenAuth.cookie_attributes[:domain] = :all
  end

  protected

  def assert_response_ok
    assert_equal 200, response.status
  end

  def assert_response_created
    assert_equal 201, response.status
  end

  def assert_response_unauthorized
    assert_equal 401, response.status
  end

  def assert_response_forbidden
    assert_equal 403, response.status
  end

  def assert_response_not_found
    assert_equal 404, response.status
  end

  def assert_response_unprocessable_entity
    assert_equal 422, response.status
  end

  def sign_in(user = nil, headers: {})
    @current_user = user || create(:user)
    post '/auth/sign_in', params: {
      email: @current_user.email,
      password: @current_user.password
    }, headers: headers, as: :json
    assert_response_ok
    assert response.cookies[DeviseTokenAuth.cookie_name]
  end

  def parsed_response
    JSON.parse response.body
  end
end
