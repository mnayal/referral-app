class InvitationMailer < ApplicationMailer
  def invitation_email
    @invitation = params[:invitation]

    mail(to: @invitation.email, subject: 'You have been invited to join our App!')
  end
end
